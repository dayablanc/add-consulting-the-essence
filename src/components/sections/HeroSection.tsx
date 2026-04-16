import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row pt-[64px]">
      {/* Image first on mobile */}
      <div className="lg:hidden w-full h-[45vh] relative overflow-hidden">
        <img src={heroImage} alt="Profesional en oficina moderna" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(61,53,48,0.06) 0%, rgba(61,53,48,0.16) 100%)' }} />
      </div>

      {/* Text panel */}
      <div className="w-full lg:w-1/2 bg-aesop-parchment flex items-center">
        <div className="section-padding py-16 lg:py-0 max-w-[600px]">
          <p className="eyebrow-mono animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            · Consultoría boutique · Costa Rica
          </p>

          <h1 className="text-aesop-soil mt-6 text-[36px] md:text-[48px] lg:text-[52px] xl:text-[56px] leading-[1.05] animate-fade-in-up" style={{ animationDelay: '120ms', letterSpacing: '-2px' }}>
            Talento y asesoría laboral, en manos expertas.
          </h1>

          <p className="text-body mt-5 animate-fade-in-up max-w-[480px]" style={{ animationDelay: '240ms', fontSize: '18px', color: 'hsl(var(--aesop-taupe))' }}>
            Acompañamos a empresas y profesionales costarricenses con soluciones a la medida en RR.HH. y derecho laboral.
          </p>

          <hr className="divider w-14 mt-8 mb-8 animate-fade-in-up" style={{ animationDelay: '360ms' }} />

          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '480ms' }}>
            <Link to="/empresa" className="btn-cta">
              Soy Empresa
            </Link>
            <Link to="/candidato" className="btn-ghost">
              Soy Candidato
            </Link>
          </div>

          <p className="animate-fade-in-up mt-8 font-sans text-[13px] text-aesop-taupe" style={{ animationDelay: '600ms' }}>
            +50 empresas confían en ADD · Costa Rica
          </p>
        </div>
      </div>

      {/* Image panel desktop */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img src={heroImage} alt="Profesional en oficina moderna" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(61,53,48,0.06) 0%, rgba(61,53,48,0.16) 100%)' }} />
      </div>
    </section>
  );
}
