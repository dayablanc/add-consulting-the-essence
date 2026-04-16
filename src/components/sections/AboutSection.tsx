import { Link } from 'react-router-dom';
import aboutImage from '@/assets/about-image.jpg';

export default function AboutSection() {
  return (
    <section className="bg-aesop-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Text */}
        <div className="lg:w-[55%]">
          <p className="eyebrow mb-6">· Nuestro enfoque</p>
          <h2 className="text-aesop-soil text-[40px] lg:text-[52px] xl:text-[56px]" style={{ letterSpacing: '-1px' }}>
            Criterio experto, soluciones a la medida.
          </h2>
          <p className="text-body mt-6">
            Cada empresa y cada profesional tiene una realidad diferente. No ofrecemos paquetes genéricos:
            diseñamos acompañamientos que se ajustan a tu contexto, tu industria y tu legislación local.
          </p>

          <div className="flex justify-center gap-6 mt-12">
            <Link to="/vacantes" className="btn-ghost">
              Ver vacantes
            </Link>
            <Link to="/recursos/blog" className="btn-ghost">
              Ir al Blog
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
