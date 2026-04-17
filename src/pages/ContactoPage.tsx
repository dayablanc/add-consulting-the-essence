import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { useI18n } from '@/i18n/context';

// TODO: reemplazar por la URL real de Calendly de ADD Consulting
const CALENDLY_URL = 'https://calendly.com/add-consulting/cita-virtual';

export default function ContactoPage() {
  const { lang } = useI18n();

  // Carga el script de Calendly una sola vez
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const copy = {
    es: {
      eyebrow: '· Contacto',
      title: 'Hablemos',
      sectionEyebrow: '· Agenda directamente',
      sectionHeading: 'Agenda una cita virtual',
      sectionBody: '30 minutos sin compromiso para entender tu situación y mostrarte cómo podemos ayudarte.',
    },
    en: {
      eyebrow: '· Contact',
      title: "Let's talk",
      sectionEyebrow: '· Schedule directly',
      sectionHeading: 'Book a virtual meeting',
      sectionBody: "30 minutes, no commitment, to understand your situation and show you how we can help.",
    },
  }[lang];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px]">
        <section className="bg-aesop-bark py-24 lg:py-32">
          <div className="max-w-[700px] mx-auto px-6 lg:px-12">
            <p className="eyebrow-mono text-aesop-clay mb-4">{copy.eyebrow}</p>
            <h1 className="text-aesop-parchment text-[40px] lg:text-[56px] font-serif font-light">
              {copy.title}
            </h1>
          </div>
        </section>

        {/* Calendly inline embed */}
        <section className="bg-aesop-white py-20 lg:py-28">
          <div className="max-w-[960px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-10">
              <p className="eyebrow mb-4">{copy.sectionEyebrow}</p>
              <h2 className="font-serif text-[28px] md:text-[32px] text-aesop-soil mb-4" style={{ letterSpacing: '-0.5px' }}>
                {copy.sectionHeading}
              </h2>
              <p className="text-body max-w-[520px] mx-auto">{copy.sectionBody}</p>
            </div>

            <div
              className="calendly-inline-widget"
              data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=9c6b4e`}
              style={{ minWidth: '320px', height: '720px' }}
            />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
