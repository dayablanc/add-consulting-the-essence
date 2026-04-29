import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { z } from "https://esm.sh/zod@3.23.8";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  startISO: z.string().datetime(),
  endISO: z.string().datetime(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_CALENDAR_API_KEY = Deno.env.get("GOOGLE_CALENDAR_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");
    if (!GOOGLE_CALENDAR_API_KEY) throw new Error("GOOGLE_CALENDAR_API_KEY missing");

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const { name, email, phone, service, notes, startISO, endISO } = parsed.data;

    // Re-check availability to avoid double booking
    const fbRes = await fetch(`${GATEWAY_URL}/freeBusy`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_CALENDAR_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: startISO,
        timeMax: endISO,
        items: [{ id: "primary" }],
      }),
    });
    const fbData = await fbRes.json();
    if (!fbRes.ok) throw new Error(`FreeBusy [${fbRes.status}]: ${JSON.stringify(fbData)}`);
    if ((fbData.calendars?.primary?.busy ?? []).length > 0) {
      return new Response(
        JSON.stringify({ error: "Slot no longer available" }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const summary = `ADD · Cita con ${name}${service ? ` (${service})` : ""}`;
    const description = [
      `Nombre: ${name}`,
      `Correo: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      service ? `Servicio: ${service}` : null,
      notes ? `\nNotas:\n${notes}` : null,
    ].filter(Boolean).join("\n");

    const evRes = await fetch(
      `${GATEWAY_URL}/calendars/primary/events?sendUpdates=all`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": GOOGLE_CALENDAR_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary,
          description,
          start: { dateTime: startISO, timeZone: "America/Costa_Rica" },
          end: { dateTime: endISO, timeZone: "America/Costa_Rica" },
          attendees: [{ email, displayName: name }],
          reminders: { useDefault: true },
        }),
      },
    );
    const evData = await evRes.json();
    if (!evRes.ok) throw new Error(`CreateEvent [${evRes.status}]: ${JSON.stringify(evData)}`);

    return new Response(
      JSON.stringify({ success: true, eventId: evData.id, htmlLink: evData.htmlLink }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("calendar-book error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
