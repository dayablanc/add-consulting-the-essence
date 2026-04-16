import { Link } from 'react-router-dom';
import aboutImage from '@/assets/about-image.jpg';

export default function AboutSection() {
  return (
    <section className="bg-aesop-white py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto section-padding flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Text */}
        <div className="lg:w-[55%]">
          <p className="eyebrow mb-4">· Nuestro enfoque</p>
          <h2 className="text-aesop-soil text-[28px] md:text-[32px]" style={{ letterSpacing: '-0.5px' }}>
            Criterio experto, soluciones a la medida.
          </h2>
          <p className="text-body mt-5">
            Cada empresa y cada profesional tiene una realidad diferente. No ofrecemos paquetes genéricos:
            diseñamos acompañamientos que se ajustan a tu contexto, tu industria y tu legislación local.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/vacantes" className="btn-ghost">
              Ver vacantes
            </Link>
            <Link to="/empresa/reclutamiento" className="btn-cta">
              Quiero reclutar
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-[45%]">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={aboutImage} alt="Profesionales en reunión" className="w-full h-full object-cover" loading="lazy" width={960} height={1200} />
          </div>
        </div>
      </div>
    </section>
  );
}
