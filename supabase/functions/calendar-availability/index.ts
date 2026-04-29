import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_CALENDAR_API_KEY = Deno.env.get("GOOGLE_CALENDAR_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");
    if (!GOOGLE_CALENDAR_API_KEY) throw new Error("GOOGLE_CALENDAR_API_KEY missing");

    const url = new URL(req.url);
    const dateStr = url.searchParams.get("date"); // YYYY-MM-DD
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Response(JSON.stringify({ error: "Invalid date" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Costa Rica is UTC-6 (no DST)
    const tzOffset = "-06:00";
    const dayStart = new Date(`${dateStr}T00:00:00${tzOffset}`);
    const dayEnd = new Date(`${dateStr}T23:59:59${tzOffset}`);

    // Block weekends
    const dow = dayStart.getUTCDay(); // 0=Sun,6=Sat in UTC after offset; recompute local
    const localDow = new Date(`${dateStr}T12:00:00${tzOffset}`).getUTCDay();
    if (localDow === 0 || localDow === 6) {
      return new Response(JSON.stringify({ slots: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Query freebusy
    const fbRes = await fetch(`${GATEWAY_URL}/freeBusy`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_CALENDAR_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        timeZone: "America/Costa_Rica",
        items: [{ id: "primary" }],
      }),
    });

    const fbData = await fbRes.json();
    if (!fbRes.ok) {
      throw new Error(`FreeBusy [${fbRes.status}]: ${JSON.stringify(fbData)}`);
    }

    const busy: Array<{ start: string; end: string }> =
      fbData.calendars?.primary?.busy ?? [];

    // Generate 30-min slots from 9:00 to 17:00 local
    const slots: { start: string; end: string; label: string }[] = [];
    for (let hour = 9; hour < 17; hour++) {
      for (const min of [0, 30]) {
        const hh = String(hour).padStart(2, "0");
        const mm = String(min).padStart(2, "0");
        const slotStart = new Date(`${dateStr}T${hh}:${mm}:00${tzOffset}`);
        const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000);

        // Skip if in the past
        if (slotStart.getTime() <= Date.now()) continue;

        const overlaps = busy.some((b) => {
          const bs = new Date(b.start).getTime();
          const be = new Date(b.end).getTime();
          return slotStart.getTime() < be && slotEnd.getTime() > bs;
        });

        if (!overlaps) {
          slots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            label: `${hh}:${mm}`,
          });
        }
      }
    }

    return new Response(JSON.stringify({ slots }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("calendar-availability error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
