import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import founderAsset from '@/assets/founder-portrait.jpeg.asset.json';

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      <div className="lg:hidden w-full flex justify-center bg-aesop-parchment pt-[120px] pb-10">
        <div className="relative">
          <div className="absolute -inset-3 rounded-full border border-aesop-rule" aria-hidden="true" />
          <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-full overflow-hidden">
            <img
              src={founderAsset.url}
              alt="Fundadora de ADD Consulting"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 18%' }}
            />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-aesop-white flex items-center pt-10 lg:pt-[140px]">
        <div className="section-padding py-16 lg:py-0 max-w-[600px]">
          <p className="eyebrow-mono animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            {t.hero.eyebrow}
          </p>
          <h1 className="text-aesop-soil mt-6 text-[36px] md:text-[48px] lg:text-[52px] xl:text-[56px] leading-[1.05] animate-fade-in-up" style={{ animationDelay: '120ms', letterSpacing: '0.015em' }}>
            {t.hero.headline}
          </h1>
          <p className="text-body mt-5 animate-fade-in-up max-w-[480px]" style={{ animationDelay: '240ms', fontSize: '18px', color: 'hsl(var(--aesop-taupe))' }}>
            {t.hero.subtitle}
          </p>
          <hr className="divider w-14 mt-8 mb-8 animate-fade-in-up" style={{ animationDelay: '360ms' }} />
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '480ms' }}>
            <Link to="/empresa" className="btn-cta">{t.hero.ctaPrimary}</Link>
            <Link to="/candidato" className="btn-ghost">{t.hero.ctaSecondary}</Link>
          </div>
          <p className="animate-fade-in-up mt-8 font-sans text-[13px] text-aesop-taupe" style={{ animationDelay: '600ms' }}>
            {t.hero.socialProof}
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-aesop-parchment overflow-hidden">
        <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="absolute -inset-5 rounded-full border border-aesop-rule" aria-hidden="true" />
          <div className="absolute -inset-10 rounded-full border border-aesop-rule/50" aria-hidden="true" />
          <div className="relative w-[420px] h-[420px] xl:w-[480px] xl:h-[480px] rounded-full overflow-hidden">
            <img
              src={founderAsset.url}
              alt="Fundadora de ADD Consulting"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 15%' }}
            />
          </div>
          <p className="mt-8 text-center font-mono text-[11px] tracking-[0.2em] uppercase text-aesop-taupe">
            ADD Consulting · Fundadora
          </p>
        </div>
      </div>
    </section>
  );
}
