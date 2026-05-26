import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Clock, FileText, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

// ─── Paleta ADD HR ───
const C = {
  crimson: '#490B14',
  gold: '#A8893A',
  ivory: '#F2ECE4',
  espresso: '#1A1410',
  lightGray: '#F5F3F0',
};

const fmtCRC = (n: number) =>
  isFinite(n) && n > 0
    ? `₡${Math.round(n).toLocaleString('es-CR').replace(/,/g, '.')}`
    : '₡0';

// ── Estilos compartidos ──
const inputCls =
  'w-full px-4 py-3 bg-white border border-aesop-rule font-sans text-[15px] text-aesop-soil focus:border-[#A8893A] outline-none transition-colors';
const labelCls =
  'block font-sans text-[12px] uppercase tracking-[1.5px] text-aesop-umber mb-2 font-medium';
const resultCard =
  'p-5 border border-[#A8893A]/40';
const ctaBtn =
  'mt-2 px-10 py-3 font-sans text-[11px] uppercase tracking-[3px] font-semibold text-white transition-all hover:opacity-90';

// Radio group helper
function Radio({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: { value: string; label: string; hint?: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            'flex items-start gap-3 p-3 cursor-pointer border transition-colors',
            value === opt.value
              ? 'border-[#A8893A] bg-white'
              : 'border-aesop-rule bg-white/50 hover:border-[#A8893A]/50'
          )}
        >
          <input
            type="radio"
            name={name}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="mt-1 accent-[#490B14]"
          />
          <div>
            <div className="font-sans text-[14px] text-aesop-soil">{opt.label}</div>
            {opt.hint && (
              <div className="font-sans text-[12px] text-aesop-umber mt-0.5">{opt.hint}</div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn(resultCard, 'flex items-center justify-between')} style={{ backgroundColor: C.ivory }}>
      <span className="font-sans text-[12px] uppercase tracking-[1.5px] text-aesop-umber">{label}</span>
      <span
        className={cn('font-mono text-[15px]', highlight && 'font-bold text-[17px]')}
        style={{ color: highlight ? C.crimson : C.espresso }}
      >
        {value}
      </span>
    </div>
  );
}

// ═════════════════════════════════════════════════════
//  CALCULADORA 1 — Salario Proporcional
// ═════════════════════════════════════════════════════
function SalarioCalc() {
  const [salario, setSalario] = useState('');
  const [jornada, setJornada] = useState<'diurna' | 'mixta' | 'nocturna'>('diurna');
  const [horasDia, setHorasDia] = useState('');
  const [diasSem, setDiasSem] = useState('');
  const [shown, setShown] = useState(false);

  const horasBase = { diurna: 8, mixta: 7, nocturna: 6 }[jornada];
  const diasBase = 5;

  const r = useMemo(() => {
    const s = parseFloat(salario) || 0;
    const h = parseFloat(horasDia) || 0;
    const d = parseFloat(diasSem) || 0;
    const factorH = horasBase ? h / horasBase : 0;
    const factorD = d / diasBase;
    const factorTotal = factorH * factorD;
    const horasMes = (horasBase * 52) / 12;
    const valorHora = horasMes ? s / horasMes : 0;
    const valorDia = valorHora * h;
    const proporcional = s * factorTotal;
    return { factorH, factorD, factorTotal, valorHora, valorDia, proporcional, h, d };
  }, [salario, horasDia, diasSem, horasBase]);

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <label className={labelCls}>Salario mensual de jornada completa</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-aesop-umber">₡</span>
            <input
              type="number"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              placeholder="0"
              className={cn(inputCls, 'pl-8')}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Jornada base</label>
          <Radio
            name="jornada-salario"
            value={jornada}
            onChange={(v) => setJornada(v as any)}
            options={[
              { value: 'diurna', label: 'Diurna', hint: '8 horas (5am – 7pm)' },
              { value: 'mixta', label: 'Mixta', hint: '7 horas' },
              { value: 'nocturna', label: 'Nocturna', hint: '6 horas (7pm – 5am)' },
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Horas por día</label>
            <input
              type="number"
              value={horasDia}
              onChange={(e) => setHorasDia(e.target.value)}
              placeholder="0"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Días por semana</label>
            <input
              type="number"
              value={diasSem}
              onChange={(e) => setDiasSem(e.target.value)}
              placeholder="0"
              className={inputCls}
            />
          </div>
        </div>

        <button
          onClick={() => setShown(true)}
          className={ctaBtn}
          style={{ backgroundColor: C.crimson }}
        >
          Calcular
        </button>
      </div>

      <div className="space-y-3">
        <h4 className="font-serif text-[22px] mb-2" style={{ color: C.espresso }}>
          Resultado
        </h4>
        {shown ? (
          <>
            <ResultRow label="Factor por horas" value={`${r.h}/${horasBase}h`} />
            <ResultRow label="Factor por días" value={`${r.d}/${diasBase}d`} />
            <ResultRow label="Factor total" value={`${(r.factorTotal * 100).toFixed(1)}%`} />
            <ResultRow label="Salario por hora" value={fmtCRC(r.valorHora)} />
            <ResultRow label="Salario por día" value={fmtCRC(r.valorDia)} />
            <ResultRow label="Salario proporcional mensual" value={fmtCRC(r.proporcional)} highlight />
          </>
        ) : (
          <div className={resultCard} style={{ backgroundColor: C.ivory }}>
            <p className="font-sans text-[14px] text-aesop-umber">
              Ingresa los datos y presiona "Calcular" para ver el resultado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════
//  CALCULADORA 2 — Horas Extra
// ═════════════════════════════════════════════════════
function HorasCalc() {
  const [salario, setSalario] = useState('');
  const [modalidad, setModalidad] = useState<'mensual' | 'quincenal' | 'semanal'>('mensual');
  const [jornada, setJornada] = useState<'diurna' | 'mixta' | 'nocturna'>('diurna');
  const [horas, setHoras] = useState('');
  const [tipo, setTipo] = useState<'ordinario' | 'descanso' | 'feriado'>('ordinario');
  const [shown, setShown] = useState(false);

  const horasBase = { diurna: 8, mixta: 7, nocturna: 6 }[jornada];
  const multiplicador = { ordinario: 1.5, descanso: 2, feriado: 2 }[tipo];
  const multLabel = { ordinario: '×1.5 (50%)', descanso: '×2 (doble)', feriado: '×2 (doble)' }[tipo];

  const r = useMemo(() => {
    const s = parseFloat(salario) || 0;
    const mensual = modalidad === 'mensual' ? s : modalidad === 'quincenal' ? s * 2 : s * 4.33;
    const horasMes = (horasBase * 52) / 12;
    const valorHora = horasMes ? mensual / horasMes : 0;
    const tarifaExtra = valorHora * multiplicador;
    const cantidad = parseFloat(horas) || 0;
    const total = tarifaExtra * cantidad;
    return { valorHora, tarifaExtra, cantidad, total };
  }, [salario, modalidad, horasBase, multiplicador, horas]);

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <label className={labelCls}>Salario bruto</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-aesop-umber">₡</span>
            <input
              type="number"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              placeholder="0"
              className={cn(inputCls, 'pl-8')}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Modalidad de pago</label>
          <Radio
            name="modalidad"
            value={modalidad}
            onChange={(v) => setModalidad(v as any)}
            options={[
              { value: 'mensual', label: 'Mensual' },
              { value: 'quincenal', label: 'Quincenal' },
              { value: 'semanal', label: 'Semanal' },
            ]}
          />
        </div>

        <div>
          <label className={labelCls}>Jornada</label>
          <Radio
            name="jornada-horas"
            value={jornada}
            onChange={(v) => setJornada(v as any)}
            options={[
              { value: 'diurna', label: 'Diurna', hint: '8 horas (5am – 7pm)' },
              { value: 'mixta', label: 'Mixta', hint: '7 horas' },
              { value: 'nocturna', label: 'Nocturna', hint: '6 horas (7pm – 5am)' },
            ]}
          />
        </div>

        <div>
          <label className={labelCls}>Cantidad de horas extra</label>
          <input
            type="number"
            value={horas}
            onChange={(e) => setHoras(e.target.value)}
            placeholder="0"
            className={inputCls}
          />
          <p className="font-sans text-[12px] text-aesop-umber mt-2">
            Máximo 4 horas extra por día para jornada diurna.
          </p>
        </div>

        <div>
          <label className={labelCls}>Tipo de día</label>
          <Radio
            name="tipo-dia"
            value={tipo}
            onChange={(v) => setTipo(v as any)}
            options={[
              { value: 'ordinario', label: 'Día ordinario', hint: 'Recargo del 50% (×1.5)' },
              { value: 'descanso', label: 'Día de descanso', hint: 'Pago doble (×2)' },
              { value: 'feriado', label: 'Día feriado', hint: 'Pago doble (×2)' },
            ]}
          />
        </div>

        <button
          onClick={() => setShown(true)}
          className={ctaBtn}
          style={{ backgroundColor: C.crimson }}
        >
          Calcular
        </button>
      </div>

      <div className="space-y-3">
        <h4 className="font-serif text-[22px] mb-2" style={{ color: C.espresso }}>
          Resultado
        </h4>
        {shown ? (
          <>
            <ResultRow label="Salario por hora ordinaria" value={fmtCRC(r.valorHora)} />
            <ResultRow label="Multiplicador aplicado" value={multLabel} />
            <ResultRow label="Tarifa por hora extra" value={fmtCRC(r.tarifaExtra)} />
            <ResultRow label="Cantidad de horas extra" value={`${r.cantidad} h`} />
            <ResultRow label="Total horas extra a pagar" value={fmtCRC(r.total)} highlight />
          </>
        ) : (
          <div className={resultCard} style={{ backgroundColor: C.ivory }}>
            <p className="font-sans text-[14px] text-aesop-umber">
              Ingresa los datos y presiona "Calcular" para ver el resultado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════
//  CALCULADORA 3 — Liquidación Laboral
// ═════════════════════════════════════════════════════
function LiquidacionCalc() {
  const [motivo, setMotivo] = useState<'despido_con' | 'despido_sin' | 'renuncia'>('despido_con');
  const [fIn, setFIn] = useState<Date | undefined>();
  const [fOut, setFOut] = useState<Date | undefined>();
  const [salario, setSalario] = useState('');
  const [vacPend, setVacPend] = useState('');
  const [salariosAcum, setSalariosAcum] = useState('');
  const [shown, setShown] = useState(false);

  const tiempo = useMemo(() => {
    if (!fIn || !fOut || fOut < fIn) return null;
    let years = fOut.getFullYear() - fIn.getFullYear();
    let months = fOut.getMonth() - fIn.getMonth();
    let days = fOut.getDate() - fIn.getDate();
    if (days < 0) {
      months -= 1;
      const prev = new Date(fOut.getFullYear(), fOut.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    const totalMonths = years * 12 + months + days / 30;
    return { years, months, days, totalMonths };
  }, [fIn, fOut]);

  const r = useMemo(() => {
    if (!tiempo) return null;
    const s = parseFloat(salario) || 0;
    const diaria = s / 30;
    const vp = parseFloat(vacPend) || 0;
    const sa = parseFloat(salariosAcum) || 0;
    const meses = tiempo.totalMonths;

    // Preaviso (solo despido con responsabilidad patronal)
    let diasPreaviso = 0;
    if (motivo === 'despido_con') {
      if (meses < 3) diasPreaviso = 0;
      else if (meses < 6) diasPreaviso = 7;
      else if (meses < 12) diasPreaviso = 14;
      else diasPreaviso = 30;
    }
    const preaviso = diaria * diasPreaviso;

    // Cesantía (solo despido con responsabilidad patronal, máx 8 años)
    let diasCesantia = 0;
    if (motivo === 'despido_con') {
      if (meses < 3) diasCesantia = 0;
      else if (meses < 6) diasCesantia = 7;
      else if (meses < 12) diasCesantia = 14;
      else {
        const anios = Math.min(tiempo.years, 8);
        diasCesantia = 20 * anios;
      }
    }
    const cesantia = diaria * diasCesantia;

    // Vacaciones proporcionales
    const diasGanados = meses * (14 / 12);
    const totalDiasVac = diasGanados + vp;
    const vacaciones = diaria * totalDiasVac;

    // Aguinaldo proporcional
    const aguinaldo = sa / 12;

    const total = preaviso + cesantia + vacaciones + aguinaldo;
    return { preaviso, cesantia, vacaciones, aguinaldo, total };
  }, [tiempo, salario, vacPend, salariosAcum, motivo]);

  const DateField = ({ value, onChange, label }: { value?: Date; onChange: (d?: Date) => void; label: string }) => (
    <div>
      <label className={labelCls}>{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal bg-white border-aesop-rule h-auto py-3 px-4',
              !value && 'text-aesop-umber'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "d 'de' MMMM yyyy", { locale: es }) : 'Selecciona fecha'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            captionLayout="dropdown-buttons"
            fromYear={1980}
            toYear={new Date().getFullYear() + 1}
            locale={es}
            className={cn('p-3 pointer-events-auto')}
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <label className={labelCls}>Motivo de terminación</label>
          <Radio
            name="motivo"
            value={motivo}
            onChange={(v) => setMotivo(v as any)}
            options={[
              { value: 'despido_con', label: 'Despido con responsabilidad patronal' },
              { value: 'despido_sin', label: 'Despido sin responsabilidad patronal' },
              { value: 'renuncia', label: 'Renuncia voluntaria' },
            ]}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <DateField label="Fecha de ingreso" value={fIn} onChange={setFIn} />
          <DateField label="Fecha de salida" value={fOut} onChange={setFOut} />
        </div>

        <div>
          <label className={labelCls}>Salario bruto mensual promedio (últimos 6 meses)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-aesop-umber">₡</span>
            <input
              type="number"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              placeholder="0"
              className={cn(inputCls, 'pl-8')}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Días de vacaciones no disfrutadas</label>
          <input
            type="number"
            value={vacPend}
            onChange={(e) => setVacPend(e.target.value)}
            placeholder="0"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Total salarios brutos acumulados en el período</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-aesop-umber">₡</span>
            <input
              type="number"
              value={salariosAcum}
              onChange={(e) => setSalariosAcum(e.target.value)}
              placeholder="0"
              className={cn(inputCls, 'pl-8')}
            />
          </div>
        </div>

        <button
          onClick={() => setShown(true)}
          className={ctaBtn}
          style={{ backgroundColor: C.crimson }}
        >
          Calcular liquidación
        </button>
      </div>

      <div className="space-y-3">
        <h4 className="font-serif text-[22px] mb-2" style={{ color: C.espresso }}>
          Resultado
        </h4>
        {!shown ? (
          <div className={resultCard} style={{ backgroundColor: C.ivory }}>
            <p className="font-sans text-[14px] text-aesop-umber">
              Ingrese las fechas y datos para ver el resultado.
            </p>
          </div>
        ) : !tiempo ? (
          <div className={resultCard} style={{ backgroundColor: C.ivory }}>
            <p className="font-sans text-[14px] text-aesop-umber">
              Ingrese las fechas para ver el resultado.
            </p>
          </div>
        ) : r && (
          <>
            <ResultRow
              label="Tiempo laborado"
              value={`${tiempo.years} años, ${tiempo.months} meses, ${tiempo.days} días`}
            />
            <ResultRow label="Preaviso" value={fmtCRC(r.preaviso)} />
            <ResultRow label="Cesantía" value={fmtCRC(r.cesantia)} />
            <ResultRow label="Vacaciones proporcionales" value={fmtCRC(r.vacaciones)} />
            <ResultRow label="Aguinaldo proporcional" value={fmtCRC(r.aguinaldo)} />
            <div
              className="p-6 border-2 mt-4"
              style={{ backgroundColor: C.ivory, borderColor: C.gold }}
            >
              <div className="font-sans text-[11px] uppercase tracking-[2px] text-aesop-umber mb-2">
                Total liquidación
              </div>
              <div className="font-mono text-[28px] font-bold" style={{ color: C.crimson }}>
                {fmtCRC(r.total)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════
//  COMPONENTE PRINCIPAL
// ═════════════════════════════════════════════════════
export default function CalculadoraLaboral() {
  return (
    <section
      id="calculadora-laboral"
      className="py-16 section-padding"
      style={{ backgroundColor: C.lightGray }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="eyebrow-mono mb-4">Herramientas</div>
          <h2 className="mb-4" style={{ color: C.espresso }}>
            Calculadora <em>Laboral</em> Costa Rica
          </h2>
          <p className="font-sans text-[16px] text-aesop-umber max-w-2xl mx-auto">
            Calcula salarios proporcionales, horas extra y liquidaciones según el Código de Trabajo.
          </p>
        </div>

        <Tabs defaultValue="salario" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-3xl mx-auto mb-10 bg-white border border-aesop-rule h-auto p-1">
            <TabsTrigger
              value="salario"
              className="flex items-center gap-2 py-3 font-sans text-[11px] uppercase tracking-[1.5px] data-[state=active]:bg-[#490B14] data-[state=active]:text-white"
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Salario Proporcional</span>
              <span className="sm:hidden">Salario</span>
            </TabsTrigger>
            <TabsTrigger
              value="horas"
              className="flex items-center gap-2 py-3 font-sans text-[11px] uppercase tracking-[1.5px] data-[state=active]:bg-[#490B14] data-[state=active]:text-white"
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Horas Extras</span>
              <span className="sm:hidden">Horas</span>
            </TabsTrigger>
            <TabsTrigger
              value="liquidacion"
              className="flex items-center gap-2 py-3 font-sans text-[11px] uppercase tracking-[1.5px] data-[state=active]:bg-[#490B14] data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Liquidación Laboral</span>
              <span className="sm:hidden">Liquidación</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="salario" className="mt-0">
            <SalarioCalc />
          </TabsContent>
          <TabsContent value="horas" className="mt-0">
            <HorasCalc />
          </TabsContent>
          <TabsContent value="liquidacion" className="mt-0">
            <LiquidacionCalc />
          </TabsContent>
        </Tabs>

        <p className="font-sans text-[12px] text-aesop-umber text-center mt-12 max-w-3xl mx-auto leading-relaxed">
          Esta calculadora es orientativa y se basa en el Código de Trabajo de Costa Rica. Para casos específicos,
          consulta con un profesional de RRHH o legal.
        </p>
      </div>
    </section>
  );
}
