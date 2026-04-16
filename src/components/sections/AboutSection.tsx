import { Link } from 'react-router-dom';
import aboutImage from '@/assets/about-image.jpg';

const values = [
  { label: 'Confidencialidad', desc: 'Protección total de información sensible' },
  { label: 'Experticia local', desc: 'Conocimiento profundo del mercado tico' },
  { label: 'Enfoque humano', desc: 'Las personas primero, siempre' },
  { label: 'Legislación costarricense', desc: 'Dominio del marco legal vigente' },
];

export default function AboutSection() {
  return (
    <section className="bg-aesop-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Text */}
        <div className="lg:w-[55%]">
          <p className="eyebrow mb-6">· Sobre ADD Consulting</p>
          <h2 className="text-aesop-soil text-[40px] lg:text-[52px] xl:text-[56px]" style={{ letterSpacing: '-1px' }}>
            Una firma construida sobre criterio, no sobre volumen.
          </h2>
          <p className="text-body mt-6">
            Somos una consultoría boutique especializada en Recursos Humanos y Derecho Laboral en Costa Rica. 
            No ofrecemos soluciones genéricas: cada empresa y cada profesional recibe un acompañamiento diseñado 
            para su realidad específica. Nuestro equipo combina experiencia legal con visión estratégica de negocio.
          </p>

          {/* Values grid */}
          <div className="grid grid-cols-2 gap-0 mt-12">
            {values.map((v, i) => (
              <div
                key={v.label}
                className="py-6 pr-6"
                style={{
                  borderBottom: i < 2 ? '1px solid hsl(var(--aesop-rule))' : 'none',
                  borderRight: i % 2 === 0 ? '1px solid hsl(var(--aesop-rule))' : 'none',
                  paddingLeft: i % 2 === 1 ? '24px' : '0',
                }}
              >
                <span className="label-mono text-aesop-clay">{v.label}</span>
                <p className="font-sans text-[13px] text-aesop-umber mt-2">{v.desc}</p>
              </div>
            ))}
          </div>

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
            <img src={aboutImage} alt="Equipo ADD Consulting" className="w-full h-full object-cover" loading="lazy" width={768} height={960} />
          </div>
        </div>
      </div>
    </section>
  );
}
