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
      <main className="min-h-screen pt-[64px] bg-aesop-white">
        {/* Hero compacto */}
        <section className="bg-aesop-bark py-8 lg:py-10">
          <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
            <p className="eyebrow-mono text-aesop-clay mb-3">
              · {service.category === 'empresa' ? 'Para empresas' : 'Para candidatos'}
            </p>
            <h1 className="text-aesop-parchment text-[32px] lg:text-[44px] font-serif font-light leading-tight">{service.name}</h1>
            <p className="eyebrow-mono text-aesop-taupe mt-3">{service.category === 'empresa' ? 'IDEAL PARA' : 'Ideal para'}: {service.idealFor}</p>
          </div>
        </section>

        {/* Layout dos columnas: info + tarjeta de compra */}
        <section className="py-12 lg:py-16">
          <div className="max-w-[1180px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
            {/* Columna izquierda: descripción + incluye */}
            <div>
              <p className="text-body text-[15px] leading-[1.8] mb-10">{service.description}</p>

              <p className="eyebrow mb-4">· Qué incluye</p>
              <ul className="space-y-0">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3"
                    style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}
                  >
                    <span className="text-aesop-clay mt-[2px] text-[13px]">—</span>
                    <span className="font-sans text-[14px] text-aesop-umber font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna derecha: tarjeta sticky de compra */}
            {hasPrice ? (
              <aside className="lg:sticky lg:top-[88px]">
                <div
                  className="p-6 bg-aesop-cream"
                  style={{ border: '1px solid hsl(var(--aesop-rule))' }}
                >
                  <p className="eyebrow-mono text-aesop-clay mb-4">· Adquirir servicio</p>

                  {hasVariants && (
                    <div className="mb-5">
                      <p className="label-mono text-aesop-umber mb-2 text-[10px]">Opción</p>
                      <div className="flex flex-col gap-2">
                        {service.priceVariants!.map((v) => {
                          const active = v.id === selectedVariant;
                          return (
                            <button
                              key={v.id}
                              onClick={() => setSelectedVariant(v.id)}
                              className="flex items-center justify-between px-3 py-2.5 text-left transition-all duration-150"
                              style={{
                                border: `1px solid ${active ? 'hsl(var(--aesop-clay))' : 'hsl(var(--aesop-rule))'}`,
                                background: active ? 'hsl(var(--aesop-white))' : 'transparent',
                              }}
                            >
                              <span className="font-sans text-[13px] text-aesop-soil">{v.label}</span>
                              <span className="font-mono text-[12px] text-aesop-umber">
                                {formatPriceCRC(v.priceCRC, currency)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Precio destacado */}
                  <div className="py-5 my-1 text-center" style={{ borderTop: '1px solid hsl(var(--aesop-rule))', borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
                    <p className="label-mono text-aesop-taupe text-[10px] mb-1">Total</p>
                    <p className="font-serif text-[36px] text-aesop-soil leading-none" style={{ fontStyle: 'normal', letterSpacing: '-1px' }}>
                      {formatPriceCRC(currentPriceCRC, currency)}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      onClick={handleBuyNow}
                      className="w-full bg-aesop-clay hover:bg-aesop-clay-hover text-aesop-parchment font-sans text-[11px] uppercase tracking-[2.5px] py-3 transition-colors duration-200"
                    >
                      Comprar ahora →
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-transparent text-aesop-soil font-sans text-[11px] uppercase tracking-[2.5px] py-2.5 transition-colors duration-200 hover:text-aesop-clay"
                      style={{ border: '1px solid hsl(var(--aesop-soil))' }}
                    >
                      Agregar al carrito
                    </button>
                  </div>

                  <p className="font-sans text-[11px] text-aesop-taupe text-center mt-4 leading-relaxed">
                    {service.postPurchaseFormUrl
                      ? 'Tras la compra completarás un breve formulario con tu información.'
                      : 'Tras la compra agendarás tu cita según disponibilidad.'}
                  </p>
                </div>
              </aside>
            ) : (
              <aside className="lg:sticky lg:top-[88px]">
                <div className="p-6 bg-aesop-cream" style={{ border: '1px solid hsl(var(--aesop-rule))' }}>
                  <p className="eyebrow-mono text-aesop-clay mb-3">· Servicio a medida</p>
                  <p className="font-sans text-[13px] text-aesop-umber font-light leading-relaxed mb-5">
                    Este servicio se cotiza según las necesidades específicas de tu empresa.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setQuoteOpen(true)}
                      className="w-full bg-aesop-clay hover:bg-aesop-clay-hover text-aesop-parchment font-sans text-[11px] uppercase tracking-[2.5px] py-3 transition-colors duration-200"
                    >
                      Cotizar servicio →
                    </button>
                    <Link
                      to="/contacto"
                      className="w-full text-center bg-transparent text-aesop-soil font-sans text-[11px] uppercase tracking-[2.5px] py-2.5 transition-colors duration-200 hover:text-aesop-clay"
                      style={{ border: '1px solid hsl(var(--aesop-soil))' }}
                    >
                      Contactar
                    </Link>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-aesop-cream py-16 lg:py-20">
          <div className="max-w-[760px] mx-auto px-6 lg:px-12">
            <p className="eyebrow mb-6">· Preguntas frecuentes</p>
            {service.faq.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
                >
                  <span className="font-sans text-[14px] text-aesop-soil">{f.q}</span>
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
                  <p className="text-body pb-5 text-[14px]">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} serviceName={service.name} />
    </>
  );
}
