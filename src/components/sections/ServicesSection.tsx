import { useState } from 'react';
import { services } from '@/data/services';
import QuoteModal from '@/components/QuoteModal';
import { Users, Scale, Building2, BookOpen, TrendingUp, Shield, Rocket, Mic, ChevronDown } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  scale: <Scale className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  building: <Building2 className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  'book-open': <BookOpen className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  'trending-up': <TrendingUp className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  shield: <Shield className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  rocket: <Rocket className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  mic: <Mic className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
};

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [quoteService, setQuoteService] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const allServices = services;
  const b2bServices = services.filter((s) => s.category === 'empresa');
  const b2cServices = services.filter((s) => s.category === 'candidato');

  const renderMainAccordion = (list: typeof services) =>
    list.map((s) => {
      const isOpen = activeId === s.id;
      return (
        <div key={s.id} style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
          <button
            onClick={() => toggle(s.id)}
            className="w-full flex items-center justify-between py-8 text-left cursor-pointer group"
          >
            <div className="flex items-center gap-5">
              <span className="flex-shrink-0">{iconMap[s.icon]}</span>
              <span className="font-serif text-[22px] lg:text-[28px] xl:text-[32px] font-light text-aesop-soil tracking-tight">
                {s.name}
              </span>
            </div>
            <ChevronDown
              className="w-5 h-5 text-aesop-taupe transition-transform duration-300 ml-4 flex-shrink-0"
              strokeWidth={1.5}
              style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
            />
          </button>

          <div
            className="overflow-hidden transition-all duration-400 ease-in-out"
            style={{
              maxHeight: isOpen ? '500px' : '0',
              opacity: isOpen ? 1 : 0,
            }}
          >
            <div className="px-0 lg:px-12 pb-8">
              <p className="text-body">{s.description}</p>
              <p className="font-sans text-[13px] text-aesop-umber mt-4">
                <span className="label-mono text-aesop-clay">Incluye: </span>
                {s.includes.join(' · ')}
              </p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setQuoteService(s.name)}
                  className="btn-cta"
                >
                  Cotizar este servicio →
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });

  const renderServiceCard = (s: typeof services[0], featured?: boolean) => (
    <div
      key={s.id}
      className="flex flex-col justify-between p-8 h-full"
      style={{
        border: featured ? '2px solid hsl(var(--aesop-clay))' : '1px solid hsl(var(--aesop-rule))',
        background: featured ? 'hsl(var(--aesop-cream))' : 'transparent',
      }}
    >
      <div>
        {featured && (
          <p className="label-mono text-aesop-clay text-[11px] mb-4 tracking-widest">RECOMENDADO</p>
        )}
        <h3 className="font-serif text-[22px] lg:text-[26px] text-aesop-soil mb-4" style={{ letterSpacing: '-0.3px' }}>
          {s.name}
        </h3>
        <p className="font-sans text-[14px] lg:text-[15px] text-aesop-umber font-light leading-relaxed mb-6">
          {s.description}
        </p>
        <ul className="space-y-2 mb-8">
          {s.includes.slice(0, 4).map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-aesop-clay mt-1 text-[8px]">●</span>
              <span className="font-sans text-[14px] text-aesop-soil">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => setQuoteService(s.name)}
        className={featured ? 'btn-cta w-full text-center' : 'w-full py-3 font-sans text-[14px] text-aesop-soil tracking-wide cursor-pointer transition-colors hover:bg-aesop-linen'}
        style={!featured ? { border: '1px solid hsl(var(--aesop-rule))' } : undefined}
      >
        Solicitar información
      </button>
    </div>
  );

  return (
    <section className="bg-aesop-cream py-24 lg:py-32">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <p className="eyebrow mb-6">· SERVICIOS ADD</p>
        <h2 className="text-aesop-soil text-[44px] lg:text-[56px] xl:text-[60px] mb-16" style={{ letterSpacing: '-1px' }}>
          LO QUE HACEMOS...&nbsp;
        </h2>

        {/* All services – main accordion */}
        <div className="mb-24">
          {renderMainAccordion(allServices)}
        </div>

        {/* B2B Division – Cards */}
        <div className="mb-24">
          <p className="eyebrow mb-3">· DIVISIÓN CORPORATIVA</p>
          <p className="font-serif text-[28px] lg:text-[36px] text-aesop-soil mb-2" style={{ letterSpacing: '-0.5px' }}>
            B2B — Empresas
          </p>
          <p className="font-sans text-[16px] lg:text-[18px] text-aesop-umber font-light mb-10">
            Soluciones integrales para empresas costarricenses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {b2bServices.slice(0, 3).map((s, i) => renderServiceCard(s, i === 0))}
          </div>
          {b2bServices.length > 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-0">
              {b2bServices.slice(3).map((s) => renderServiceCard(s))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }} className="mb-20" />

        {/* B2C Division – Cards */}
        <div>
          <p className="eyebrow mb-3">· DIVISIÓN DE CARRERA</p>
          <p className="font-serif text-[28px] lg:text-[36px] text-aesop-soil mb-2" style={{ letterSpacing: '-0.5px' }}>
            B2C — Profesionales
          </p>
          <p className="font-sans text-[16px] lg:text-[18px] text-aesop-umber font-light mb-10">
            Acompañamiento para profesionales y candidatos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {b2cServices.map((s, i) => renderServiceCard(s, i === 0))}
          </div>
        </div>
      </div>

      <QuoteModal
        open={!!quoteService}
        onClose={() => setQuoteService(null)}
        serviceName={quoteService || undefined}
      />
    </section>
  );
}
