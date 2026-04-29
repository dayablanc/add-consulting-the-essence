import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import QuoteModal from '@/components/QuoteModal';
import { services } from '@/data/services';
import { ChevronDown } from 'lucide-react';
import { useCart } from '@/cart/CartContext';
import { useI18n } from '@/i18n/context';
import { formatPriceCRC } from '@/i18n/constants';

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addItem, setOpen: setCartOpen } = useCart();
  const { currency } = useI18n();
  const navigate = useNavigate();

  const hasVariants = !!service?.priceVariants?.length;
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    service?.priceVariants?.[0]?.id
  );

  if (!service) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-[64px] bg-aesop-parchment flex items-center justify-center">
          <p className="text-body">Servicio no encontrado.</p>
        </main>
        <Footer />
      </>
    );
  }

  const isB2C = service.category === 'candidato';
  const hasPrice = isB2C && (service.priceCRC !== undefined || hasVariants);

  const activeVariant = hasVariants
    ? service.priceVariants!.find(v => v.id === selectedVariant) ?? service.priceVariants![0]
    : null;

  const currentPriceCRC = activeVariant ? activeVariant.priceCRC : service.priceCRC ?? 0;

  const buildItem = () => ({
    serviceId: service.id,
    slug: service.slug,
    name: service.name,
    priceCRC: currentPriceCRC,
    variantLabel: activeVariant?.label,
    key: activeVariant ? `${service.id}:${activeVariant.id}` : service.id,
  });

  const handleAddToCart = () => addItem(buildItem());

  const handleBuyNow = () => {
    addItem(buildItem());
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px]">
        {/* Hero */}
        <section className="bg-aesop-bark py-6 lg:py-8">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <p className="eyebrow-mono text-aesop-clay mb-4">
              · {service.category === 'empresa' ? 'Para empresas' : 'Para candidatos'}
            </p>
            <h1 className="text-aesop-parchment text-[40px] lg:text-[56px] font-serif font-light">{service.name}</h1>
            <p className="eyebrow-mono text-aesop-taupe mt-4">Ideal para: {service.idealFor}</p>
          </div>
        </section>

        {/* Description */}
        <section className="bg-aesop-white py-16 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <p className="text-body text-[16px] leading-[1.9]">{service.description}</p>
          </div>
        </section>

        {/* Includes */}
        <section className="bg-aesop-cream py-20 lg:py-28">
          <div className="max-w-[700px] mx-auto px-6 lg:px-12">
            <p className="eyebrow mb-6">· Qué incluye</p>
            <ul className="space-y-4">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 py-4" style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
                  <span className="text-aesop-clay mt-1">—</span>
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* B2C: pricing + purchase */}
        {hasPrice && (
          <section className="bg-aesop-white py-20 lg:py-28">
            <div className="max-w-[700px] mx-auto px-6 lg:px-12">
              <p className="eyebrow mb-6">· Adquirir servicio</p>

              {hasVariants && (
                <div className="mb-8">
                  <p className="label-mono text-aesop-clay mb-4">Selecciona una opción</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {service.priceVariants!.map((v) => {
                      const active = v.id === selectedVariant;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v.id)}
                          className="px-4 py-4 text-left transition-all duration-200"
                          style={{
                            border: `1px solid ${active ? 'hsl(var(--aesop-clay))' : 'hsl(var(--aesop-rule))'}`,
                            background: active ? 'hsl(var(--aesop-cream))' : 'transparent',
                          }}
                        >
                          <span className="block font-sans text-[14px] text-aesop-soil">{v.label}</span>
                          <span className="block font-mono text-[13px] text-aesop-umber mt-1">
                            {formatPriceCRC(v.priceCRC, currency)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div
                className="flex items-baseline justify-between py-6"
                style={{ borderTop: '1px solid hsl(var(--aesop-rule))', borderBottom: '1px solid hsl(var(--aesop-rule))' }}
              >
                <span className="eyebrow-mono">· Precio</span>
                <span className="font-mono text-[28px] text-aesop-soil">
                  {formatPriceCRC(currentPriceCRC, currency)}
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button onClick={handleBuyNow} className="btn-cta flex-1 text-center">
                  Adquirir servicio →
                </button>
                <button onClick={handleAddToCart} className="btn-ghost flex-1 text-center">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </section>
        )}

        {/* FAQ + CTA */}
        <section className="bg-aesop-white py-20 lg:py-28">
          <div className="max-w-[700px] mx-auto px-6 lg:px-12">
            <p className="eyebrow mb-6">· Preguntas frecuentes</p>
            {service.faq.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
                >
                  <span className="font-sans text-[15px] text-aesop-soil">{f.q}</span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1}
                    className="text-aesop-taupe transition-transform duration-200 flex-shrink-0 ml-4"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFaq === i ? '200px' : '0', opacity: openFaq === i ? 1 : 0 }}
                >
                  <p className="text-body pb-6">{f.a}</p>
                </div>
              </div>
            ))}

            {!hasPrice && (
              <div className="mt-16 text-center">
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => setQuoteOpen(true)} className="btn-ghost">
                    Cotizar este servicio →
                  </button>
                  <Link to="/contacto" className="btn-cta">
                    Solicitar servicio →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} serviceName={service.name} />
    </>
  );
}
