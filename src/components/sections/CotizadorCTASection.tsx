import { Link } from 'react-router-dom';

export default function CotizadorCTASection() {
  return (
    <section className="bg-aesop-linen py-20 lg:py-28">
      <div className="max-w-[700px] mx-auto section-padding text-center">
        <p className="eyebrow mb-4">· ¿No sabes por dónde empezar?</p>
        <h2 className="text-aesop-soil text-[28px] md:text-[32px]" style={{ letterSpacing: '-0.5px' }}>
          Te ayudamos a encontrar el servicio ideal.
        </h2>
        <p className="text-body mt-5 max-w-[480px] mx-auto">
          Responde 4 preguntas rápidas y recibe una recomendación personalizada basada en tu situación.
        </p>
        <div className="mt-8">
          <Link to="/cotizador" className="btn-cta">
            Ir al cotizador →
          </Link>
        </div>
      </div>
    </section>
  );
}
