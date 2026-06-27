import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import founderAsset from '@/assets/founder-cutout.png.asset.json';

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative bg-aesop-parchment overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-[140px] lg:pt-[160px] pb-0 lg:pb-0 min-h-[88vh] lg:min-h-[92vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">

          {/* Text column */}
          <div className="lg:col-span-7 xl:col-span-7 relative z-10 pb-16 lg:pb-24">
            <p className="eyebrow-mono animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              {t.hero.eyebrow}
            </p>

            <h1
              className="text-aesop-soil mt-6 animate-fade-in-up"
              style={{
                animationDelay: '120ms',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: 'clamp(40px, 6vw, 84px)',
                lineHeight: 1.02,
                letterSpacing: '-0.01em',
              }}
            >
              {t.hero.headline}
            </h1>

            <p
              className="mt-7 max-w-[480px] animate-fade-in-up"
              style={{
                animationDelay: '240ms',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '17px',
                lineHeight: 1.6,
                color: 'hsl(var(--aesop-taupe))',
              }}
            >
              {t.hero.subtitle}
            </p>

            <hr className="divider w-14 mt-8 mb-8 animate-fade-in-up" style={{ animationDelay: '360ms' }} />

            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '480ms' }}>
              <Link to="/empresa" className="btn-cta">{t.hero.ctaPrimary}</Link>
              <Link to="/candidato" className="btn-ghost">{t.hero.ctaSecondary}</Link>
            </div>

            <p
              className="animate-fade-in-up mt-10 flex items-center gap-3"
              style={{
                animationDelay: '600ms',
                fontFamily: "'Courier Prime', monospace",
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'hsl(var(--aesop-taupe))',
              }}
            >
              <span className="inline-block w-6 h-px bg-aesop-rule" />
              {t.hero.socialProof}
            </p>
          </div>

          {/* Portrait column */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end items-end">
            {/* Decorative circle behind */}
            <div
              className="hidden lg:block absolute pointer-events-none"
              style={{
                right: '8%',
                bottom: '12%',
                width: '420px',
                height: '420px',
                borderRadius: '9999px',
                background: 'hsl(var(--aesop-linen))',
                zIndex: 0,
              }}
              aria-hidden="true"
            />
            {/* Vertical mono label */}
            <div
              className="hidden lg:flex absolute left-0 bottom-24 flex-col items-center gap-3 z-10"
              aria-hidden="true"
            >
              <span className="block h-16 w-px bg-aesop-rule" />
              <span
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: 'hsl(var(--aesop-taupe))',
                }}
              >
                ADD Consulting · Est. 2018
              </span>
            </div>

            {/* Portrait */}
            <img
              src={founderAsset.url}
              alt="Fundadora de ADD Consulting"
              className="relative z-[5] w-full max-w-[420px] lg:max-w-none lg:w-auto lg:h-[78vh] xl:h-[82vh] object-contain object-bottom animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            />

            {/* Mono caption bottom-right */}
            <div
              className="hidden lg:block absolute right-0 bottom-6 text-right z-10"
              aria-hidden="true"
            >
              <p
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'hsl(var(--aesop-taupe))',
                  marginBottom: '6px',
                }}
              >
                Fundadora · CR
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: '20px',
                  color: 'hsl(var(--aesop-bark))',
                }}
              >
                Andrea D. Delgado
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
