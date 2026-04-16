import { Link } from 'react-router-dom';

export default function CotizadorCTASection() {
  return (
    <section className="bg-aesop-linen py-24 lg:py-32">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
        <p className="eyebrow mb-6">· ¿No sabes por dónde empezar?</p>
        <h2 className="text-aesop-soil text-[36px] lg:text-[48px]">
          Te ayudamos a encontrar el servicio ideal.
        </h2>
        <p className="text-body mt-6 max-w-[500px] mx-auto">
          Responde 4 preguntas rápidas y recibe una recomendación personalizada basada en tu situación.
        </p>
        <div className="mt-10">
          <Link to="/cotizador" className="btn-cta">
            Ir al cotizador →
          </Link>
        </div>
      </div>
    </section>
  );
}
