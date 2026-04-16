import { useState } from 'react';
import { services } from '@/data/services';
import QuoteModal from '@/components/QuoteModal';

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [quoteService, setQuoteService] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-aesop-cream py-24 lg:py-32">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <p className="eyebrow mb-6">· Servicios</p>
        <h2 className="text-aesop-soil text-[44px] lg:text-[56px] xl:text-[60px] mb-16" style={{ letterSpacing: '-1px' }}>Lo que hacemos</h2>

        <div>
          {services.map((s) => {
            const isOpen = activeId === s.id;
            return (
              <div key={s.id}>
                <div className="py-1">
                  <p className="eyebrow-mono text-[10px] pt-6">
                    Ideal para: {s.idealFor}
                  </p>
                </div>
                <div style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
                  <button
                    onClick={() => toggle(s.id)}
                    className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
                  >
                    <span className="font-serif text-[24px] lg:text-[28px] font-light text-aesop-soil">
                      {s.name}
                    </span>
                    <span
                      className="font-sans text-[20px] text-aesop-taupe transition-transform duration-300 ml-4 flex-shrink-0"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-400 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '500px' : '0',
                      opacity: isOpen ? 1 : 0,
                      background: isOpen ? 'hsl(var(--aesop-clay-tint))' : 'transparent',
                    }}
                  >
                    <div className="px-0 lg:px-8 py-8">
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
              </div>
            );
          })}
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
