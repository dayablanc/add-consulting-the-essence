import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import QuoteModal from '@/components/QuoteModal';
import { services } from '@/data/services';
import { ChevronDown } from 'lucide-react';

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);
  const [quoteOpen, setQuoteOpen] = useState(false);
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
        <section className="bg-aesop-white py-8 lg:py-10">
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
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} serviceName={service.name} />
    </>
  );
}
