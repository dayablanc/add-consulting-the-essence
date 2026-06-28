import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import heroImage from '@/assets/hero-image.jpg';

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative bg-aesop-parchment overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-[80px] lg:pt-[88px] pb-6 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Text column */}
          <div className="lg:col-span-6 xl:col-span-6 relative z-10">
            <p className="eyebrow-mono animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              {t.hero.eyebrow}
            </p>

            <h1
              className="text-aesop-soil mt-4 animate-fade-in-up"
              style={{
                animationDelay: '120ms',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: 'clamp(32px, 4.5vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              {t.hero.headline}
            </h1>

            <p
              className="mt-4 max-w-[420px] animate-fade-in-up"
              style={{
                animationDelay: '240ms',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                lineHeight: 1.5,
                color: 'hsl(var(--aesop-bark))',
              }}
            >
              {t.hero.subtitle}
            </p>

            <hr className="divider w-14 mt-6 mb-6 animate-fade-in-up" style={{ animationDelay: '360ms' }} />

            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '480ms' }}>
              <Link to="/empresa" className="btn-cta text-[9px] py-2 px-4">{t.hero.ctaPrimary}</Link>
              <Link to="/candidato" className="btn-ghost text-[9px] py-2 px-4">{t.hero.ctaSecondary}</Link>
            </div>

          </div>

          {/* Image column */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center items-center">
            <img
              src={heroImage}
              alt="Oficina ADD Consulting"
              className="relative z-[5] w-full max-w-[280px] md:max-w-[340px] lg:max-w-none lg:w-full lg:h-[40vh] object-cover animate-fade-in-up rounded-sm"
              style={{ animationDelay: '200ms' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
