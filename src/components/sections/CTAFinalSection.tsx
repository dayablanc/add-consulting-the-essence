import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';

export default function CTAFinalSection() {
  const { t } = useI18n();

  return (
    <section className="py-10 lg:py-12 bg-aesop-white">
      <div className="max-w-[800px] mx-auto section-padding text-center">
        <h2
          className="font-serif text-[28px] md:text-[32px] font-light text-aesop-soil mb-6"
          style={{ letterSpacing: '-0.5px', fontStyle: 'normal' }}
        >
          {t.ctaFinal.heading}
        </h2>
        <p className="font-sans text-[16px] font-light mb-10 max-w-[480px] mx-auto text-aesop-umber">
          {t.ctaFinal.body}
        </p>
        <Link
          to="/contacto"
          className="inline-block font-sans text-[12px] font-normal uppercase tracking-[2.5px] px-10 py-4 bg-aesop-clay text-aesop-parchment cursor-pointer transition-all duration-200 hover:bg-aesop-soil rounded-[9999px]"
        >
          Agendar llamada gratuita
        </Link>
      </div>
    </section>
  );
}
