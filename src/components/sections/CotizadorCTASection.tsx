import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';

export default function CotizadorCTASection() {
  const { t } = useI18n();

  return (
    <section className="bg-aesop-white py-20 lg:py-28">
      <div className="max-w-[700px] mx-auto section-padding text-center">
        <p className="eyebrow mb-4">{t.cotizadorCta.eyebrow}</p>
        <h2 className="text-aesop-soil text-[28px] md:text-[32px]" style={{ letterSpacing: '-0.5px' }}>
          {t.cotizadorCta.heading}
        </h2>
        <p className="text-body mt-5 max-w-[480px] mx-auto">{t.cotizadorCta.body}</p>
        <div className="mt-8">
          <Link to="/cotizador" className="btn-cta">{t.cotizadorCta.cta}</Link>
        </div>
      </div>
    </section>
  );
}
