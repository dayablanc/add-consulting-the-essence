import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import founderAsset from '@/assets/founder-cutout.png.asset.json';

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative bg-aesop-parchment overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-[100px] lg:pt-[112px] pb-8 lg:pb-12">
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
                color: 'hsl(var(--aesop-taupe))',
              }}
            >
              {t.hero.subtitle}
            </p>

            <hr className="divider w-14 mt-6 mb-6 animate-fade-in-up" style={{ animationDelay: '360ms' }} />

            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '480ms' }}>
              <Link to="/empresa" className="btn-cta text-[9px] py-2 px-4">{t.hero.ctaPrimary}</Link>
              <Link to="/candidato" className="btn-ghost text-[9px] py-2 px-4">{t.hero.ctaSecondary}</Link>
            </div>

            <p
              className="animate-fade-in-up mt-6 flex items-center gap-3"
              style={{
                animationDelay: '600ms',
                fontFamily: "'Courier Prime', monospace",
                fontSize: '10px',
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
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center items-center">
            {/* Decorative circle behind */}
            <div
              className="hidden lg:block absolute pointer-events-none"
              style={{
                right: '50%',
                top: '50%',
                transform: 'translate(50%, -50%)',
                width: '260px',
                height: '260px',
                borderRadius: '9999px',
                background: 'hsl(var(--aesop-linen))',
                zIndex: 0,
              }}
              aria-hidden="true"
            />
            {/* Vertical mono label */}
            <div
              className="hidden lg:flex absolute left-0 bottom-16 flex-col items-center gap-3 z-10"
              aria-hidden="true"
            >
              <span className="block h-12 w-px bg-aesop-rule" />
              <span
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: '9px',
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
              className="relative z-[5] w-full max-w-[240px] md:max-w-[280px] lg:max-w-none lg:w-auto lg:h-[40vh] object-contain object-bottom animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            />

            {/* Mono caption bottom-right */}
            <div
              className="hidden lg:block absolute right-0 bottom-4 text-right z-10"
              aria-hidden="true"
            >
              <p
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'hsl(var(--aesop-taupe))',
                  marginBottom: '4px',
                }}
              >
                Fundadora · CR
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: '18px',
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
