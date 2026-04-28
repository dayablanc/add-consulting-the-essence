import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

// ─── TU LINK DE GOOGLE CALENDAR ──────────────────────────────────
const GOOGLE_CALENDAR_LINK = 'https://calendar.app.google/bxDbFuCjsLbgD7qZ9';

// ─── HELPERS ─────────────────────────────────────────────────────
const MONTH_NAMES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

const DAY_NAMES = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isPastDate(day: number, month: number, year: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

function isWeekend(day: number, month: number, year: number) {
  const d = new Date(year, month, day).getDay();
  return d === 0 || d === 6;
}

// ─── COMPONENTE ──────────────────────────────────────────────────
export default function ContactoPage() {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [selectedDay,  setSelectedDay]  = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  const slots = ['9:00','10:00','11:00','14:00','15:00','16:00'];

  // ── Navegación de meses ────────────────────────────────────────
  const currentMonth = today.getMonth();
  const currentYear  = today.getFullYear();
  const monthsFromNow = (viewYear - currentYear) * 12 + (viewMonth - currentMonth);
  const canGoPrev = monthsFromNow > 0;
  const canGoNext = monthsFromNow < 3;

  function prevMonth() {
    if (!canGoPrev) return;
    setSelectedDay(null);
    setSelectedSlot('');
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else { setViewMonth(m => m - 1); }
  }

  function nextMonth() {
    if (!canGoNext) return;
    setSelectedDay(null);
    setSelectedSlot('');
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else { setViewMonth(m => m + 1); }
  }

  // ── Grid ───────────────────────────────────────────────────────
  const totalDays = getDaysInMonth(viewYear, viewMonth);
  const firstDay  = getFirstDayOfMonth(viewYear, viewMonth);
  const blanks    = Array.from({ length: firstDay });
  const days      = Array.from({ length: totalDays }, (_, i) => i + 1);

  // ── Submit ─────────────────────────────────────────────────────
  const onSubmit = () => {
    if (!selectedDay || !selectedSlot) {
      toast({
        title: 'Selecciona fecha y horario',
        description: 'Por favor elige un día y una hora para tu cita.',
      });
      return;
    }
    toast({
      title: '¡Formulario enviado!',
      description: `Ahora hacé clic en el botón verde para confirmar tu cita del ${selectedDay} de ${MONTH_NAMES[viewMonth]} a las ${selectedSlot}.`,
    });
    reset();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px]">

        {/* Hero */}
        <section className="bg-aesop-bark py-6 lg:py-8">
          <div className="max-w-[700px] mx-auto px-6 lg:px-12">
            <p className="eyebrow-mono text-aesop-clay mb-4">· Contacto</p>
            <h1 className="text-aesop-parchment text-[40px] lg:text-[56px] font-serif font-light">
              Hablemos
            </h1>
          </div>
        </section>

        {/* Formulario */}
        <section className="bg-aesop-white py-20 lg:py-28">
          <div className="max-w-[560px] mx-auto px-6 lg:px-12">
            <h2 className="font-serif italic text-[32px] text-aesop-soil mb-3">
              Envíanos un mensaje y agenda tu cita
            </h2>
            <p className="text-body mb-8">
              Completa tus datos y reserva un espacio de 30 minutos sin compromiso.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Campos del formulario */}
              <div>
                <label className="label-mono text-aesop-clay block mb-2">Nombre</label>
                <input
                  {...register('name')}
                  className="aesop-input"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label className="label-mono text-aesop-clay block mb-2">Correo electrónico</label>
                <input
                  {...register('email')}
                  type="email"
                  className="aesop-input"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <div>
                <label className="label-mono text-aesop-clay block mb-2">Tipo</label>
                <select {...register('type')} className="aesop-input">
                  <option value="">Seleccionar...</option>
                  <option value="empresa">Soy Empresa</option>
                  <option value="candidato">Soy Candidato</option>
                </select>
              </div>

              <div>
                <label className="label-mono text-aesop-clay block mb-2">Tema de la reunión</label>
                <input
                  {...register('message')}
                  className="aesop-input"
                  placeholder="Ej: Consulta sobre contratación de personal"
                  maxLength={80}
                />
              </div>

              {/* ── CALENDARIO ─────────────────────────────────── */}
              <div className="pt-4" style={{ borderTop: '1px solid hsl(var(--aesop-rule))' }}>
                <p className="eyebrow-mono text-aesop-clay mb-2 mt-6">· Agenda tu cita</p>
                <h3 className="font-serif italic text-[22px] text-aesop-soil mb-2">
                  Selecciona fecha y horario
                </h3>
                <p className="text-body text-[14px] mb-6">Llamada exploratoria de 30 minutos.</p>

                {/* Navegación mes */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={prevMonth}
                    disabled={!canGoPrev}
                    style={{
                      opacity: canGoPrev ? 1 : 0.25,
                      cursor: canGoPrev ? 'pointer' : 'not-allowed',
                      color: 'hsl(var(--aesop-clay))',
                      padding: '4px',
                    }}
                    aria-label="Mes anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <p className="label-mono text-aesop-clay text-center">
                    {MONTH_NAMES[viewMonth].toUpperCase()} {viewYear}
                  </p>

                  <button
                    type="button"
                    onClick={nextMonth}
                    disabled={!canGoNext}
                    style={{
                      opacity: canGoNext ? 1 : 0.25,
                      cursor: canGoNext ? 'pointer' : 'not-allowed',
                      color: 'hsl(var(--aesop-clay))',
                      padding: '4px',
                    }}
                    aria-label="Mes siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {DAY_NAMES.map(d => (
                    <div
                      key={d}
                      className="text-center font-mono text-[10px] pb-1"
                      style={{ color: 'hsl(var(--aesop-clay))' }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Grid de días */}
                <div className="grid grid-cols-7 gap-1 mb-6">
                  {blanks.map((_, i) => <div key={`b-${i}`} />)}

                  {days.map(d => {
                    const disabled = isPastDate(d, viewMonth, viewYear) || isWeekend(d, viewMonth, viewYear);
                    const selected = selectedDay === d;
                    return (
                      <button
                        type="button"
                        key={d}
                        disabled={disabled}
                        onClick={() => { setSelectedDay(d); setSelectedSlot(''); }}
                        className="aspect-square flex items-center justify-center font-mono text-[12px] transition-colors duration-200"
                        style={{
                          background: selected ? 'hsl(var(--aesop-clay))' : 'transparent',
                          color: disabled
                            ? 'hsl(var(--aesop-rule))'
                            : selected
                            ? 'hsl(var(--aesop-parchment))'
                            : 'hsl(var(--aesop-soil))',
                          border: '1px solid hsl(var(--aesop-rule))',
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          opacity: disabled ? 0.4 : 1,
                        }}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>

                {/* Horarios */}
                {selectedDay && (
                  <>
                    <p className="label-mono text-aesop-clay mb-3">Horario disponible</p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {slots.map(s => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setSelectedSlot(s)}
                          className="py-3 font-mono text-[13px] transition-colors duration-200 cursor-pointer"
                          style={{
                            background: selectedSlot === s ? 'hsl(var(--aesop-clay))' : 'transparent',
                            color: selectedSlot === s ? 'hsl(var(--aesop-parchment))' : 'hsl(var(--aesop-soil))',
                            border: '1px solid hsl(var(--aesop-rule))',
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Resumen selección */}
                {selectedDay && selectedSlot && (
                  <p className="label-mono text-aesop-soil mb-6 text-center">
                    Cita seleccionada: {selectedDay} {MONTH_NAMES[viewMonth]} · {selectedSlot}
                  </p>
                )}
              </div>

              {/* ── BOTONES ──────────────────────────────────────── */}
              <div className="space-y-3">

                {/* Botón 1: enviar formulario */}
                <button type="submit" className="btn-cta w-full">
                  Enviar formulario
                </button>

                {/* Botón 2: agendar en Google — siempre visible */}
                
                  href={GOOGLE_CALENDAR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 font-mono text-[13px] transition-colors duration-200"
                  style={{
                    border: '1px solid hsl(var(--aesop-clay))',
                    color: 'hsl(var(--aesop-parchment))',
                    background: 'hsl(var(--aesop-clay))',
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                  }}
                >
                  <Calendar size={15} />
                  AGENDAR EN GOOGLE CALENDAR
                </a>

              </div>

            </form>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}