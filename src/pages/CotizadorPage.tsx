import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

type Profile = 'empresa' | 'candidato' | 'estudiante' | null;
type Step = 1 | 2 | 3 | 4 | 5;

export default function CotizadorPage() {
  const [step, setStep] = useState<Step>(1);
  const [profile, setProfile] = useState<Profile>(null);
  const [size, setSize] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [urgency, setUrgency] = useState('');

  const toggleNeed = (n: string) => {
    setNeeds(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]);
  };

  const getRecommendation = () => {
    if (profile === 'empresa') {
      if (needs.includes('Asesoría legal')) return { name: 'Risk & Compliance', slug: '/empresa/risk-compliance', desc: 'Auditoría y blindaje legal laboral para proteger tu operación.' };
      if (size === '+80' || size === '21–80') return { name: 'ADD Strategic Partner', slug: '/empresa/strategic-partner', desc: 'Tu departamento de RR.HH. externo. Gestión integral y acompañamiento continuo.' };
      return { name: 'Corporative Essentials', slug: '/empresa/essentials', desc: 'El punto de partida para formalizar tu gestión de personas y cumplir con la ley.' };
    }
    if (profile === 'estudiante') return { name: 'ADD First Step', slug: '/candidato/first-step', desc: 'Tu primer paso al mundo laboral. Construye tu perfil profesional desde cero.' };
    return { name: 'ADD Grow', slug: '/candidato/add-grow', desc: 'Programa de aceleración profesional. Optimiza tu perfil y conecta con oportunidades.' };
  };

  const next = () => setStep((s) => Math.min(s + 1, 5) as Step);

  const empresaNeeds = ['Gestión RR.HH.', 'Reclutamiento', 'Asesoría legal', 'Capacitación', 'Cultura'];
  const candidatoNeeds = ['Mejorar CV y LinkedIn', 'Preparación para entrevistas', 'Negociación salarial', 'Encontrar vacantes'];

  const rec = getRecommendation();

  const steps = [1, 2, 3, 4];

  return (
    <>
      <Header />
      <main className="bg-aesop-cream min-h-screen pt-[64px]">
        <div className="max-w-[700px] mx-auto px-6 py-16 lg:py-24">
          <p className="eyebrow mb-6">· Cotizador</p>
          <h2 className="text-aesop-soil text-[36px] lg:text-[48px] mb-12">Encuentra tu servicio ideal</h2>

          {/* Progress */}
          <div className="relative mb-16">
            <div className="absolute top-[4px] left-0 right-0 h-[1px] bg-aesop-rule" />
            <div className="flex justify-between relative">
              {steps.map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div
                    className="w-2 h-2 relative z-10 transition-colors duration-200"
                    style={{
                      borderRadius: '50%',
                      background: step > s ? 'hsl(var(--aesop-soil))' :
                        step === s ? 'hsl(var(--aesop-clay))' : 'transparent',
                      border: step >= s ? 'none' : '1px solid hsl(var(--aesop-rule))',
                    }}
                  />
                  <span className="font-mono text-[10px] text-aesop-taupe mt-2">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h3 className="font-serif italic text-[28px] text-aesop-soil mb-8">¿Quién eres?</h3>
              <div className="space-y-4">
                {([
                  { val: 'empresa' as Profile, label: 'Dueño/a o gerente de empresa' },
                  { val: 'candidato' as Profile, label: 'Profesional en búsqueda de empleo' },
                  { val: 'estudiante' as Profile, label: 'Estudiante o recién graduado/a' },
                ]).map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => { setProfile(opt.val); next(); }}
                    className="w-full text-left px-10 py-6 font-sans text-[14px] transition-colors duration-200 cursor-pointer"
                    style={{
                      border: `1px solid ${profile === opt.val ? 'hsl(var(--aesop-clay))' : 'hsl(var(--aesop-rule))'}`,
                      background: profile === opt.val ? 'hsl(var(--aesop-clay-tint))' : 'transparent',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h3 className="font-serif italic text-[28px] text-aesop-soil mb-8">
                {profile === 'empresa' ? '¿Cuántos colaboradores tiene tu empresa?' : '¿En qué etapa estás?'}
              </h3>
              <div className="space-y-4">
                {(profile === 'empresa'
                  ? ['1–5', '6–20', '21–80', '+80']
                  : ['Buscando activamente', 'Empleado/a, quiero crecer', 'Quiero cambiar de carrera']
                ).map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSize(opt); next(); }}
                    className="w-full text-left px-10 py-6 font-sans text-[14px] transition-colors duration-200 cursor-pointer"
                    style={{
                      border: `1px solid ${size === opt ? 'hsl(var(--aesop-clay))' : 'hsl(var(--aesop-rule))'}`,
                      background: size === opt ? 'hsl(var(--aesop-clay-tint))' : 'transparent',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h3 className="font-serif italic text-[28px] text-aesop-soil mb-8">¿Qué necesitas?</h3>
              <div className="flex flex-wrap gap-3">
                {(profile === 'empresa' ? empresaNeeds : candidatoNeeds).map(n => (
                  <button
                    key={n}
                    onClick={() => toggleNeed(n)}
                    className="px-5 py-3 font-sans text-[13px] transition-colors duration-200 cursor-pointer"
                    style={{
                      border: `1px solid ${needs.includes(n) ? 'hsl(var(--aesop-clay))' : 'hsl(var(--aesop-rule))'}`,
                      background: needs.includes(n) ? 'hsl(var(--aesop-clay-tint))' : 'transparent',
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button onClick={next} className="btn-cta mt-8">Continuar →</button>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <h3 className="font-serif italic text-[28px] text-aesop-soil mb-8">¿Cuándo necesitas comenzar?</h3>
              <div className="space-y-4">
                {['Esta semana', 'Este mes', 'En 1–3 meses', 'Solo explorando'].map(u => (
                  <button
                    key={u}
                    onClick={() => { setUrgency(u); setStep(5); }}
                    className="w-full text-left px-10 py-6 font-sans text-[14px] transition-colors duration-200 cursor-pointer"
                    style={{
                      border: `1px solid ${urgency === u ? 'hsl(var(--aesop-clay))' : 'hsl(var(--aesop-rule))'}`,
                      background: urgency === u ? 'hsl(var(--aesop-clay-tint))' : 'transparent',
                    }}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {step === 5 && (
            <div className="animate-fade-in-up" style={{ border: '1px solid hsl(var(--aesop-rule))', padding: '56px' }}>
              <p className="eyebrow-mono mb-4">Te recomendamos</p>
              <h3 className="font-serif italic text-[40px] lg:text-[48px] text-aesop-soil leading-tight">{rec.name}</h3>
              <p className="text-body mt-4">{rec.desc}</p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <Link to="/contacto" className="btn-cta">Agendar llamada exploratoria</Link>
                <Link to={rec.slug} className="btn-ghost">Ver detalles del servicio</Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
