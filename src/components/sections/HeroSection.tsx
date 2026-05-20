import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import heroImage from '@/assets/hero-image.jpg';

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="min-h-screen flex flex-col lg:flex-row pt-[120px] lg:pt-[140px]">
      <div className="lg:hidden w-full h-[45vh] relative overflow-hidden">
        <img src={heroImage} alt="Profesional en oficina moderna" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(61,53,48,0.06) 0%, rgba(61,53,48,0.16) 100%)' }} />
      </div>

      <div className="w-full lg:w-1/2 bg-aesop-white flex items-center">
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

      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img src={heroImage} alt="Profesional en oficina moderna" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(61,53,48,0.06) 0%, rgba(61,53,48,0.16) 100%)' }} />
      </div>
    </section>
  );
}
