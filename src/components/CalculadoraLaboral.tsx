import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Clock, FileText } from 'lucide-react';

// ─── Paleta ADD HR (uso local en esta sección) ───
const COLORS = {
  crimson: '#490B14',
  gold: '#A8893A',
  ivory: '#F2ECE4',
  espresso: '#1A1410',
  lightGray: '#F5F3F0',
};

const fmtCRC = (n: number) =>
  isFinite(n)
    ? `₡${Math.round(n).toLocaleString('es-CR').replace(/,/g, '.')}`
    : '₡0';

// ──────────────── Estilos compartidos ────────────────
const inputCls =
  'w-full px-4 py-3 bg-white border border-aesop-rule font-sans text-[15px] text-aesop-soil focus:border-[#A8893A] outline-none transition-colors';
const labelCls =
  'block font-sans text-[12px] uppercase tracking-[1.5px] text-aesop-umber mb-2 font-medium';
const resultCard =
  'p-5 border border-[#A8893A]/40';
const ctaBtn =
  'mt-2 px-10 py-3 font-sans text-[11px] uppercase tracking-[3px] font-semibold text-white transition-all hover:opacity-90';

type Tab = 'salario' | 'horas' | 'liquidacion';

// ═════════════════════════════════════════════════════
//  CALCULADORA 1 — Salario Proporcional y Neto
// ═════════════════════════════════════════════════════
function SalarioCalc() {
  const [salario, setSalario] = useState('');
  const [jornada, setJornada] = useState<'diurna' | 'mixta' | 'nocturna'>('diurna');
  const [horasDia, setHorasDia] = useState('');
  const [diasSem, setDiasSem] = useState('');
  const [shown, setShown] = useState(false);

  const horasBase = { diurna: 8, mixta: 7, nocturna: 6 }[jornada];
  const semBase = { diurna: 48, mixta: 42, nocturna: 36 }[jornada];

  const r = useMemo(() => {
    const s = parseFloat(salario) || 0;
    const h = parseFloat(horasDia) || 0;
    const d = parseFloat(diasSem) || 0;
    const factor = (h / horasBase) * (d / 5);
    const horasMes = (semBase * 52) / 12;
    const valorHora = s / horasMes;
    const valorDia = valorHora * horasBase;
    const brutoProp = s * factor;

    // Deducciones CCSS
    const sem = brutoProp * 0.055;
    const ivm = brutoProp * 0.0417;
    const bp = brutoProp * 0.01;
    const ccssTotal = sem + ivm + bp;

    // Impuesto de renta (tramos marginales acumulados)
    const calcRenta = (b: number) => {
      let tax = 0;
      const tramos = [
        { hasta: 942000, rate: 0 },
        { hasta: 1413000, rate: 0.1 },
        { hasta: 2476000, rate: 0.15 },
        { hasta: 4951000, rate: 0.2 },
        { hasta: Infinity, rate: 0.25 },
      ];
      let prev = 0;
      for (const t of tramos) {
        if (b <= prev) break;
        const slice = Math.min(b, t.hasta) - prev;
        tax += slice * t.rate;
        prev = t.hasta;
      }
      return tax;
    };
    const renta = calcRenta(brutoProp);
    const totalDed = ccssTotal + renta;
    const neto = brutoProp - totalDed;

    return { factor, valorHora, valorDia, brutoProp, sem, ivm, bp, ccssTotal, renta, totalDed, neto };
  }, [salario, jornada, horasDia, diasSem, horasBase, semBase]);

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      {/* INPUTS */}
      <div className="space-y-5">
        <h3 className="font-serif text-[22px] text-aesop-soil mb-2">Datos del trabajador</h3>

        <div>
          <label className={labelCls}>Salario mensual base (₡)</label>
          <input type="number" className={inputCls} value={salario}
            onChange={(e) => setSalario(e.target.value)} placeholder="Ej: 600000" />
        </div>

        <div>
          <label className={labelCls}>Tipo de jornada</label>
          <select className={inputCls} value={jornada} onChange={(e) => setJornada(e.target.value as any)}>
            <option value="diurna">Diurna (8 hrs)</option>
            <option value="mixta">Mixta (7 hrs)</option>
            <option value="nocturna">Nocturna (6 hrs)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Horas / día</label>
            <input type="number" className={inputCls} value={horasDia}
              onChange={(e) => setHorasDia(e.target.value)} placeholder={String(horasBase)} />
          </div>
          <div>
            <label className={labelCls}>Días / semana</label>
            <input type="number" className={inputCls} value={diasSem}
              onChange={(e) => setDiasSem(e.target.value)} placeholder="5" />
          </div>
        </div>

        <button className={ctaBtn} style={{ backgroundColor: COLORS.crimson }} onClick={() => setShown(true)}>
          Calcular
        </button>
      </div>

      {/* RESULTADOS */}
      {shown && (
        <div className="space-y-6">
          {/* Bloque A */}
          <div>
            <p className="eyebrow mb-3" style={{ color: COLORS.gold }}>Bloque A — Proporcionalidad</p>
            <div className="grid grid-cols-2 gap-3">
              <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
                <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Factor</p>
                <p className="font-mono text-[18px] mt-1">{(r.factor * 100).toFixed(2)}%</p>
              </div>
              <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
                <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Salario / hora</p>
                <p className="font-mono text-[18px] mt-1">{fmtCRC(r.valorHora)}</p>
              </div>
              <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
                <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Salario / día</p>
                <p className="font-mono text-[18px] mt-1">{fmtCRC(r.valorDia)}</p>
              </div>
              <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
                <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Bruto proporcional</p>
                <p className="font-mono text-[18px] mt-1">{fmtCRC(r.brutoProp)}</p>
              </div>
            </div>
          </div>

          {/* Bloque B */}
          <div>
            <p className="eyebrow mb-3" style={{ color: COLORS.gold }}>Bloque B — Deducciones</p>
            <div className="border border-[#A8893A]/40 divide-y divide-[#A8893A]/20" style={{ backgroundColor: COLORS.ivory }}>
              {[
                ['Salario bruto', r.brutoProp],
                ['SEM — CCSS Salud (5.50%)', -r.sem],
                ['IVM — CCSS Pensión (4.17%)', -r.ivm],
                ['Banco Popular (1.00%)', -r.bp],
                ['Total CCSS (10.67%)', -r.ccssTotal],
                ['Impuesto de renta', -r.renta],
                ['Total deducciones', -r.totalDed],
              ].map(([label, val]) => (
                <div key={label as string} className="flex justify-between items-center px-5 py-3">
                  <span className="font-sans text-[13px] text-aesop-umber">{label}</span>
                  <span className="font-mono text-[14px] text-aesop-soil">
                    {(val as number) < 0 ? '− ' : ''}{fmtCRC(Math.abs(val as number))}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-6 border-2" style={{ borderColor: COLORS.crimson, backgroundColor: COLORS.lightGray }}>
              <p className="text-[11px] uppercase tracking-[2px] text-aesop-umber mb-2">Salario neto a recibir</p>
              <p className="font-serif text-[34px] font-semibold" style={{ color: COLORS.crimson }}>
                {fmtCRC(r.neto)}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-[12px] text-aesop-umber leading-relaxed">
            <p>* Los tramos del impuesto de renta se actualizan anualmente por decreto. Consulta la tabla vigente en el Ministerio de Hacienda.</p>
            <p>* El trabajador a tiempo parcial recibe vacaciones, aguinaldo y cesantía de forma proporcional a su jornada.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════
//  CALCULADORA 2 — Horas Extras
// ═════════════════════════════════════════════════════
function HorasExtrasCalc() {
  const [salario, setSalario] = useState('');
  const [jornada, setJornada] = useState<'diurna' | 'mixta' | 'nocturna'>('diurna');
  const [tipo, setTipo] = useState<'15' | '175' | '2' | '225'>('15');
  const [cantidad, setCantidad] = useState('');
  const [shown, setShown] = useState(false);

  const semBase = { diurna: 48, mixta: 42, nocturna: 36 }[jornada];
  const factor = { '15': 1.5, '175': 1.75, '2': 2, '225': 2.25 }[tipo];

  const r = useMemo(() => {
    const s = parseFloat(salario) || 0;
    const q = parseFloat(cantidad) || 0;
    const horasMes = (semBase * 52) / 12;
    const valorHora = s / horasMes;
    const valorHE = valorHora * factor;
    const total = valorHE * q;
    return { horasMes, valorHora, valorHE, total };
  }, [salario, cantidad, semBase, factor]);

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-5">
        <h3 className="font-serif text-[22px] text-aesop-soil mb-2">Cálculo de hora extra</h3>

        <div>
          <label className={labelCls}>Salario mensual (₡)</label>
          <input type="number" className={inputCls} value={salario}
            onChange={(e) => setSalario(e.target.value)} placeholder="Ej: 600000" />
        </div>

        <div>
          <label className={labelCls}>Tipo de jornada</label>
          <select className={inputCls} value={jornada} onChange={(e) => setJornada(e.target.value as any)}>
            <option value="diurna">Diurna (8 hrs/día, 48 hrs/sem)</option>
            <option value="mixta">Mixta (7 hrs/día)</option>
            <option value="nocturna">Nocturna (6 hrs/día)</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Tipo de hora extra</label>
          <select className={inputCls} value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
            <option value="15">Hora extra diurna (1.5×)</option>
            <option value="175">Extra nocturna sobre jornada diurna (1.75×)</option>
            <option value="2">Día de descanso/feriado — diurna (2×)</option>
            <option value="225">Día de descanso/feriado — nocturna (2.25×)</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Cantidad de horas extra</label>
          <input type="number" className={inputCls} value={cantidad}
            onChange={(e) => setCantidad(e.target.value)} placeholder="Ej: 10" />
        </div>

        <button className={ctaBtn} style={{ backgroundColor: COLORS.crimson }} onClick={() => setShown(true)}>
          Calcular
        </button>
      </div>

      {shown && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
              <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Horas mes</p>
              <p className="font-mono text-[18px] mt-1">{r.horasMes.toFixed(2)}</p>
            </div>
            <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
              <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Hora ordinaria</p>
              <p className="font-mono text-[18px] mt-1">{fmtCRC(r.valorHora)}</p>
            </div>
            <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
              <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Factor aplicado</p>
              <p className="font-mono text-[18px] mt-1">{factor}×</p>
            </div>
            <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
              <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Valor hora extra</p>
              <p className="font-mono text-[18px] mt-1">{fmtCRC(r.valorHE)}</p>
            </div>
          </div>

          <div className="p-6 border-2" style={{ borderColor: COLORS.crimson, backgroundColor: COLORS.lightGray }}>
            <p className="text-[11px] uppercase tracking-[2px] text-aesop-umber mb-2">Total a pagar</p>
            <p className="font-serif text-[34px] font-semibold" style={{ color: COLORS.crimson }}>
              {fmtCRC(r.total)}
            </p>
          </div>

          <p className="text-[12px] text-aesop-umber leading-relaxed">
            * Según el Artículo 139 del Código de Trabajo de Costa Rica, las horas extras no pueden exceder 4 por día ni 12 por semana.
          </p>
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════
//  CALCULADORA 3 — Liquidación Laboral
// ═════════════════════════════════════════════════════
function LiquidacionCalc() {
  const [motivo, setMotivo] = useState<'despido_cr' | 'despido_sr' | 'renuncia'>('despido_cr');
  const [inicio, setInicio] = useState('');
  const [salida, setSalida] = useState('');
  const [salario, setSalario] = useState('');
  const [vacPend, setVacPend] = useState('');
  const [totalSalarios, setTotalSalarios] = useState('');
  const [shown, setShown] = useState(false);

  const r = useMemo(() => {
    const s = parseFloat(salario) || 0;
    const vp = parseFloat(vacPend) || 0;
    const ts = parseFloat(totalSalarios) || 0;
    if (!inicio || !salida) return null;

    const d1 = new Date(inicio);
    const d2 = new Date(salida);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime()) || d2 < d1) return null;

    // años/meses/días
    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();
    if (days < 0) {
      months -= 1;
      const prev = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) { years -= 1; months += 12; }

    const totalMonths = years * 12 + months + days / 30;
    const diaSal = s / 30;

    // Preaviso (días)
    let preavisoDias = 0;
    if (totalMonths >= 12) preavisoDias = 30;
    else if (totalMonths >= 6) preavisoDias = 14;
    else if (totalMonths >= 3) preavisoDias = 7;
    const aplicaPreaviso = motivo === 'despido_cr';
    const preaviso = aplicaPreaviso ? diaSal * preavisoDias : 0;

    // Cesantía
    let cesantiaDias = 0;
    if (motivo === 'despido_cr') {
      if (totalMonths >= 12) {
        const yrs = Math.min(years + (months >= 6 ? 1 : 0), 8);
        cesantiaDias = 20 * yrs;
      } else if (totalMonths >= 6) cesantiaDias = 14;
      else if (totalMonths >= 3) cesantiaDias = 7;
    }
    const cesantia = diaSal * cesantiaDias;

    // Vacaciones
    const vacGanadas = totalMonths * (14 / 12);
    const vacTotalDias = vacGanadas + vp;
    const vacaciones = diaSal * vacTotalDias;

    // Aguinaldo
    const aguinaldo = ts / 12;

    const total = preaviso + cesantia + vacaciones + aguinaldo;

    return { years, months, days, preaviso, cesantia, vacaciones, aguinaldo, total, aplicaPreaviso, motivo, preavisoDias };
  }, [motivo, inicio, salida, salario, vacPend, totalSalarios]);

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-5">
        <h3 className="font-serif text-[22px] text-aesop-soil mb-2">Datos de la relación laboral</h3>

        <div>
          <label className={labelCls}>Motivo de salida</label>
          <select className={inputCls} value={motivo} onChange={(e) => setMotivo(e.target.value as any)}>
            <option value="despido_cr">Despido con responsabilidad patronal</option>
            <option value="despido_sr">Despido sin responsabilidad (renuncia justificada)</option>
            <option value="renuncia">Renuncia voluntaria</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Fecha de inicio</label>
            <input type="date" className={inputCls} value={inicio} onChange={(e) => setInicio(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Fecha de salida</label>
            <input type="date" className={inputCls} value={salida} onChange={(e) => setSalida(e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Salario promedio mensual (últimos 6 meses) ₡</label>
          <input type="number" className={inputCls} value={salario}
            onChange={(e) => setSalario(e.target.value)} placeholder="Ej: 700000" />
        </div>

        <div>
          <label className={labelCls}>Días de vacaciones pendientes</label>
          <input type="number" className={inputCls} value={vacPend}
            onChange={(e) => setVacPend(e.target.value)} placeholder="0" />
        </div>

        <div>
          <label className={labelCls}>Total de salarios brutos acumulados (aguinaldo) ₡</label>
          <input type="number" className={inputCls} value={totalSalarios}
            onChange={(e) => setTotalSalarios(e.target.value)} placeholder="Ej: 8400000" />
        </div>

        <button className={ctaBtn} style={{ backgroundColor: COLORS.crimson }} onClick={() => setShown(true)}>
          Calcular liquidación
        </button>
      </div>

      {shown && r && (
        <div className="space-y-3">
          <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
            <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Tiempo laborado</p>
            <p className="font-mono text-[16px] mt-1">
              {r.years} años · {r.months} meses · {r.days} días
            </p>
          </div>

          <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Preaviso ({r.preavisoDias} días)</p>
                {!r.aplicaPreaviso && (
                  <p className="text-[10px] text-aesop-umber italic mt-1">
                    {r.motivo === 'renuncia' ? 'En renuncia voluntaria lo paga el trabajador' : 'No aplica para este motivo'}
                  </p>
                )}
              </div>
              <p className="font-mono text-[18px]">{fmtCRC(r.preaviso)}</p>
            </div>
          </div>

          <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
            <div className="flex justify-between items-center">
              <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Cesantía</p>
              <p className="font-mono text-[18px]">{fmtCRC(r.cesantia)}</p>
            </div>
          </div>

          <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
            <div className="flex justify-between items-center">
              <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Vacaciones proporcionales</p>
              <p className="font-mono text-[18px]">{fmtCRC(r.vacaciones)}</p>
            </div>
          </div>

          <div className={resultCard} style={{ backgroundColor: COLORS.ivory }}>
            <div className="flex justify-between items-center">
              <p className="text-[11px] uppercase tracking-[1.5px] text-aesop-umber">Aguinaldo proporcional</p>
              <p className="font-mono text-[18px]">{fmtCRC(r.aguinaldo)}</p>
            </div>
          </div>

          <div className="p-6 border-2 mt-4" style={{ borderColor: COLORS.crimson, backgroundColor: COLORS.lightGray }}>
            <p className="text-[11px] uppercase tracking-[2px] text-aesop-umber mb-2">Total liquidación</p>
            <p className="font-serif text-[36px] font-semibold" style={{ color: COLORS.crimson }}>
              {fmtCRC(r.total)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════
//  SECCIÓN PRINCIPAL
// ═════════════════════════════════════════════════════
export default function CalculadoraLaboral() {
  const [tab, setTab] = useState<Tab>('salario');

  return (
    <section id="calculadora-laboral" className="py-20 lg:py-28" style={{ backgroundColor: COLORS.lightGray }}>
      <div className="max-w-[1200px] mx-auto section-padding">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4" style={{ color: COLORS.gold }}>Herramientas</p>
          <h2 className="text-aesop-soil mb-4">Calculadora Laboral Costa Rica</h2>
          <p className="text-body max-w-[620px] mx-auto">
            Calcula salarios, horas extra y liquidaciones según el Código de Trabajo.
          </p>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
          <TabsList className="w-full bg-transparent border-b border-aesop-rule p-0 h-auto justify-start gap-0 mb-10 overflow-x-auto flex-nowrap">
            {[
              { id: 'salario', label: 'Salario y Deducciones', Icon: Briefcase },
              { id: 'horas', label: 'Horas Extras', Icon: Clock },
              { id: 'liquidacion', label: 'Liquidación Laboral', Icon: FileText },
            ].map(({ id, label, Icon }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="flex-1 min-w-fit px-6 py-4 font-sans text-[12px] uppercase tracking-[2px] text-aesop-umber data-[state=active]:text-aesop-soil data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-[#490B14] transition-colors"
              >
                <Icon size={16} className="mr-2" />
                <span className="whitespace-nowrap">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="bg-white p-8 lg:p-12 border border-aesop-rule">
            <TabsContent value="salario" className="mt-0"><SalarioCalc /></TabsContent>
            <TabsContent value="horas" className="mt-0"><HorasExtrasCalc /></TabsContent>
            <TabsContent value="liquidacion" className="mt-0"><LiquidacionCalc /></TabsContent>
          </div>
        </Tabs>

        <p className="text-center text-[12px] text-aesop-umber mt-10 max-w-[720px] mx-auto leading-relaxed">
          Esta calculadora es orientativa. Los resultados se basan en el Código de Trabajo de Costa Rica y las tarifas vigentes de CCSS e impuesto de renta. Para casos específicos, consulta con un profesional de RRHH o legal.
        </p>
      </div>
    </section>
  );
}
