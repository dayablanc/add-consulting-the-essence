import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row pt-[64px]">
      {/* Image first on mobile */}
      <div className="lg:hidden w-full h-[50vh] relative overflow-hidden">
        <img src={heroImage} alt="Profesional en oficina moderna" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(61,53,48,0.06) 0%, rgba(61,53,48,0.16) 100%)' }} />
      </div>

      {/* Text panel */}
      <div className="w-full lg:w-1/2 bg-aesop-parchment flex items-center">
        <div className="px-8 lg:px-16 xl:px-24 py-16 lg:py-0 max-w-[600px]">
          <p className="eyebrow-mono animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            · Consultoría boutique · Costa Rica
          </p>

          <h1 className="text-aesop-soil mt-6 text-[48px] lg:text-[72px] xl:text-[84px] animate-fade-in-up" style={{ animationDelay: '120ms' }}>
            Talento y derecho laboral, en manos expertas.
          </h1>

          <p className="text-body mt-6 animate-fade-in-up" style={{ animationDelay: '240ms' }}>
            Acompañamos a empresas y profesionales costarricenses con soluciones a la medida.
          </p>

          <hr className="divider w-14 mt-9 mb-9 animate-fade-in-up" style={{ animationDelay: '360ms' }} />

          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '480ms' }}>
            <Link to="/empresa" className="btn-ghost">
              <span className="text-aesop-clay mr-1">·</span> Soy Empresa
            </Link>
            <Link to="/candidato" className="btn-ghost">
              <span className="text-aesop-clay mr-1">·</span> Soy Candidato
            </Link>
          </div>
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
