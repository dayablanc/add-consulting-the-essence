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

  const renderCompactList = (list: typeof services) =>
    list.map((s) => (
      <div key={s.id} style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
        <button
          onClick={() => setQuoteService(s.name)}
          className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <span className="flex-shrink-0">{iconMap[s.icon]}</span>
            <span className="font-serif text-[18px] lg:text-[22px] font-light text-aesop-soil">
              {s.name}
            </span>
          </div>
          <span className="font-sans text-[13px] text-aesop-taupe ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            Cotizar →
          </span>
        </button>
      </div>
    ));

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

        {/* B2B Division */}
        <div className="mb-20">
          <p className="eyebrow mb-3">· DIVISIÓN CORPORATIVA</p>
          <p className="font-serif text-[28px] lg:text-[36px] text-aesop-soil mb-2" style={{ letterSpacing: '-0.5px' }}>
            B2B — Empresas
          </p>
          <p className="font-sans text-[16px] lg:text-[18px] text-aesop-umber font-light mb-8">
            Soluciones integrales para empresas costarricenses.
          </p>
          <div>{renderCompactList(b2bServices)}</div>
        </div>

        {/* Divider */}
        <div style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }} className="mb-20" />

        {/* B2C Division */}
        <div>
          <p className="eyebrow mb-3">· DIVISIÓN DE CARRERA</p>
          <p className="font-serif text-[28px] lg:text-[36px] text-aesop-soil mb-2" style={{ letterSpacing: '-0.5px' }}>
            B2C — Profesionales
          </p>
          <p className="font-sans text-[16px] lg:text-[18px] text-aesop-umber font-light mb-8">
            Acompañamiento para profesionales y candidatos.
          </p>
          <div>{renderCompactList(b2cServices)}</div>
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
