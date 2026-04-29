import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const MONTH_NAMES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];
const DAY_NAMES = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }
function isPastDate(d: number, m: number, y: number) {
  const t = new Date(); t.setHours(0,0,0,0);
  return new Date(y, m, d) < t;
}
function isWeekend(d: number, m: number, y: number) {
  const x = new Date(y, m, d).getDay();
  return x === 0 || x === 6;
}

interface Slot { start: string; end: string; label: string; }

interface Props {
  defaultService?: string;
  serviceOptions?: { value: string; label: string }[];
}

export default function BookingForm({ defaultService = '', serviceOptions = [] }: Props) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: '', email: '', phone: '', service: defaultService, notes: '' },
  });
  const { toast } = useToast();

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthsFromNow = (viewYear - currentYear) * 12 + (viewMonth - currentMonth);
  const canGoPrev = monthsFromNow > 0;
  const canGoNext = monthsFromNow < 3;

  function prevMonth() {
    if (!canGoPrev) return;
    setSelectedDay(null); setSelectedSlot(null); setSlots([]);
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (!canGoNext) return;
    setSelectedDay(null); setSelectedSlot(null); setSlots([]);
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  useEffect(() => {
    if (!selectedDay) return;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    setLoadingSlots(true);
    setSlots([]);
    setSelectedSlot(null);
    supabase.functions.invoke('calendar-availability', {
      method: 'GET',
      // @ts-ignore - allow query params
      headers: {},
    } as any).then(async () => {
      // fallback: use fetch since invoke doesn't support GET query params well
    }).catch(() => {});

    // Use direct fetch for GET with query params
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/calendar-availability?date=${dateStr}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
    })
      .then(r => r.json())
      .then(data => {
        setSlots(Array.isArray(data.slots) ? data.slots : []);
      })
      .catch(() => {
        toast({ title: 'Error', description: 'No se pudo cargar disponibilidad.' });
      })
      .finally(() => setLoadingSlots(false));
  }, [selectedDay, viewMonth, viewYear]);

  const totalDays = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const blanks = Array.from({ length: firstDay });
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const onSubmit = async (data: any) => {
    if (!selectedSlot) {
      toast({ title: 'Selecciona un horario', description: 'Elige día y hora antes de confirmar.' });
      return;
    }
    setSubmitting(true);
    try {
      const { data: res, error } = await supabase.functions.invoke('calendar-book', {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          service: data.service || '',
          notes: data.notes || '',
          startISO: selectedSlot.start,
          endISO: selectedSlot.end,
        },
      });
      if (error) throw error;
      if ((res as any)?.error) throw new Error((res as any).error);

      setConfirmation(
        `Tu cita está confirmada para el ${selectedDay} de ${MONTH_NAMES[viewMonth]} a las ${selectedSlot.label}. Te enviamos invitación a ${data.email}.`
      );
      toast({ title: '¡Cita agendada!', description: 'Recibirás invitación por correo.' });
      reset();
      setSelectedSlot(null);
      setSelectedDay(null);
      setSlots([]);
    } catch (err: any) {
      toast({ title: 'Error al agendar', description: err.message || 'Intenta nuevamente.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div className="text-center py-8">
        <h3 className="font-serif italic text-[28px] text-aesop-soil mb-4">¡Listo!</h3>
        <p className="text-body">{confirmation}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="label-mono text-aesop-clay block mb-2">Nombre</label>
        <input {...register('name', { required: true })} className="aesop-input" placeholder="Tu nombre" required />
      </div>
      <div>
        <label className="label-mono text-aesop-clay block mb-2">Correo electrónico</label>
        <input {...register('email', { required: true })} type="email" className="aesop-input" placeholder="correo@ejemplo.com" required />
      </div>
      <div>
        <label className="label-mono text-aesop-clay block mb-2">Teléfono (opcional)</label>
        <input {...register('phone')} className="aesop-input" placeholder="+506 ..." />
      </div>
      {serviceOptions.length > 0 && (
        <div>
          <label className="label-mono text-aesop-clay block mb-2">Servicio de interés</label>
          <select {...register('service')} className="aesop-input">
            <option value="">Seleccionar...</option>
            {serviceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      )}
      <div>
        <label className="label-mono text-aesop-clay block mb-2">Tema de la reunión</label>
        <textarea {...register('notes', { maxLength: 500 })} className="aesop-input min-h-[80px] resize-none" placeholder="Cuéntanos brevemente..." />
      </div>

      <div className="pt-4" style={{ borderTop: '1px solid hsl(var(--aesop-rule))' }}>
        <p className="eyebrow-mono text-aesop-clay mb-2 mt-6">· Disponibilidad en tiempo real</p>
        <h3 className="font-serif italic text-[22px] text-aesop-soil mb-2">Selecciona fecha y horario</h3>
        <p className="text-body text-[14px] mb-6">Llamada exploratoria de 30 minutos.</p>

        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={prevMonth} disabled={!canGoPrev}
            style={{ opacity: canGoPrev ? 1 : 0.25, cursor: canGoPrev ? 'pointer' : 'not-allowed', color: 'hsl(var(--aesop-clay))', padding: 4 }}
            aria-label="Mes anterior">
            <ChevronLeft size={18} />
          </button>
          <p className="label-mono text-aesop-clay text-center">{MONTH_NAMES[viewMonth].toUpperCase()} {viewYear}</p>
          <button type="button" onClick={nextMonth} disabled={!canGoNext}
            style={{ opacity: canGoNext ? 1 : 0.25, cursor: canGoNext ? 'pointer' : 'not-allowed', color: 'hsl(var(--aesop-clay))', padding: 4 }}
            aria-label="Mes siguiente">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAY_NAMES.map(d => (
            <div key={d} className="text-center font-mono text-[10px] pb-1" style={{ color: 'hsl(var(--aesop-clay))' }}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-6">
          {blanks.map((_, i) => <div key={`b-${i}`} />)}
          {days.map(d => {
            const disabled = isPastDate(d, viewMonth, viewYear) || isWeekend(d, viewMonth, viewYear);
            const selected = selectedDay === d;
            return (
              <button type="button" key={d} disabled={disabled}
                onClick={() => setSelectedDay(d)}
                className="aspect-square flex items-center justify-center font-mono text-[12px] transition-colors duration-200"
                style={{
                  background: selected ? 'hsl(var(--aesop-clay))' : 'transparent',
                  color: disabled ? 'hsl(var(--aesop-rule))' : selected ? 'hsl(var(--aesop-parchment))' : 'hsl(var(--aesop-soil))',
                  border: '1px solid hsl(var(--aesop-rule))',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.4 : 1,
                }}>
                {d}
              </button>
            );
          })}
        </div>

        {selectedDay && (
          <>
            <p className="label-mono text-aesop-clay mb-3">Horarios disponibles</p>
            {loadingSlots ? (
              <div className="flex items-center gap-2 text-aesop-taupe py-4">
                <Loader2 size={14} className="animate-spin" />
                <span className="font-mono text-[12px]">Consultando calendario...</span>
              </div>
            ) : slots.length === 0 ? (
              <p className="font-mono text-[12px] text-aesop-taupe py-4">No hay horarios disponibles este día.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 mb-6">
                {slots.map(s => (
                  <button type="button" key={s.start} onClick={() => setSelectedSlot(s)}
                    className="py-3 font-mono text-[13px] transition-colors duration-200 cursor-pointer"
                    style={{
                      background: selectedSlot?.start === s.start ? 'hsl(var(--aesop-clay))' : 'transparent',
                      color: selectedSlot?.start === s.start ? 'hsl(var(--aesop-parchment))' : 'hsl(var(--aesop-soil))',
                      border: '1px solid hsl(var(--aesop-rule))',
                    }}>
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {selectedDay && selectedSlot && (
          <p className="label-mono text-aesop-soil mb-6 text-center">
            Cita: {selectedDay} {MONTH_NAMES[viewMonth]} · {selectedSlot.label}
          </p>
        )}
      </div>

      <button type="submit" disabled={submitting} className="btn-cta w-full flex items-center justify-center gap-2">
        {submitting && <Loader2 size={14} className="animate-spin" />}
        {submitting ? 'Agendando...' : 'CONFIRMAR CITA'}
      </button>
    </form>
  );
}
