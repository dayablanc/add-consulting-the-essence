import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BackButton from '@/components/BackButton';
import { services } from '@/data/services';
import { ChevronDown, Calendar } from 'lucide-react';

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
  const hasPrice = isB2C && (service.priceCRC !== undefined || !!service.priceVariants?.length);

  const formatCRC = (n?: number) =>
    n !== undefined ? `₡${n.toLocaleString('es-CR').replace(/,/g, '.')}` : '';

  const priceText = hasPrice
    ? service.priceVariants?.length
      ? service.priceVariants.map(v => `${v.label}: ${formatCRC(v.priceCRC)}`).join(' / ')
      : formatCRC(service.priceCRC)
    : '';

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px] bg-aesop-white">
        {/* Hero compacto */}
        <section className="bg-aesop-bark py-8 lg:py-10">
          <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
            <BackButton />
            <p className="eyebrow-mono text-aesop-parchment mb-3 mt-4">
              · {service.category === 'empresa' ? 'Para empresas' : 'Para candidatos'}
            </p>
            <h1 className="text-aesop-parchment text-[32px] lg:text-[44px] font-serif font-light leading-tight">{service.name}</h1>
            <p className="eyebrow-mono text-aesop-taupe mt-3">{service.category === 'empresa' ? 'IDEAL PARA' : 'Ideal para'}: {service.idealFor}</p>
          </div>
        </section>

        {/* Layout dos columnas: info + tarjeta CTA */}
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

            {/* Columna derecha: tarjeta sticky CTA */}
            <aside className="lg:sticky lg:top-[88px]">
              <div className="p-6 bg-aesop-cream" style={{ border: '1px solid hsl(var(--aesop-rule))' }}>
                {hasPrice && (
                  <div className="pb-4 mb-4" style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
                    <p className="label-mono text-aesop-umber text-[10px] mb-1">Inversión</p>
                    <p className="font-serif text-[28px] text-aesop-soil leading-none">{priceText}</p>
                  </div>
                )}

                <p className="eyebrow-mono mb-3">· {hasPrice ? '¿Interesado?' : 'Llamada de diagnóstico'}</p>
                <p className="font-serif text-[22px] text-aesop-soil leading-tight mb-3" style={{ letterSpacing: '-0.3px' }}>
                  {hasPrice ? 'Conversemos sobre este servicio' : 'Conversemos sobre tu caso'}
                </p>
                <p className="font-sans text-[13px] text-aesop-umber font-light leading-relaxed mb-5">
                  {hasPrice
                    ? 'Escríbenos por WhatsApp y te damos más información sobre este servicio, formas de pago y próximos pasos.'
                    : 'Agenda una llamada gratuita de 30 minutos. Revisamos tus necesidades y definimos el camino a seguir, sin compromiso.'}
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/50689069915?text=${encodeURIComponent(`Hola, me interesa el servicio: ${service.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-aesop-clay hover:bg-aesop-clay-hover text-aesop-parchment font-sans text-[11px] uppercase tracking-[2.5px] py-3 transition-colors duration-200 inline-flex items-center justify-center gap-2"
                  >
                    <Calendar size={13} strokeWidth={1.5} />
                    {hasPrice ? 'Más información por WhatsApp' : 'Contactar por WhatsApp'}
                  </a>
                  {!hasPrice && (
                    <Link
                      to={`/contacto?service=${encodeURIComponent(service.name)}`}
                      className="w-full bg-transparent text-aesop-soil font-sans text-[11px] uppercase tracking-[2.5px] py-2.5 transition-colors duration-200 hover:text-aesop-clay text-center"
                      style={{ border: '1px solid hsl(var(--aesop-soil))' }}
                    >
                      Agendar llamada gratuita
                    </Link>
                  )}
                </div>
              </div>
            </aside>
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
    </>
  );
}
