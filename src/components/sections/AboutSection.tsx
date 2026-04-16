import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import aboutImage from '@/assets/about-image.jpg';

export default function AboutSection() {
  const { t } = useI18n();

  return (
    <section className="bg-aesop-white py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto section-padding flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-[55%]">
          <p className="eyebrow mb-4">{t.about.eyebrow}</p>
          <h2 className="text-aesop-soil text-[28px] md:text-[32px]" style={{ letterSpacing: '-0.5px' }}>
            {t.about.heading}
          </h2>
          <p className="text-body mt-5">{t.about.body}</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/vacantes" className="btn-ghost">{t.about.ctaVacancies}</Link>
            <Link to="/empresa/reclutamiento" className="btn-cta">{t.about.ctaRecruit}</Link>
          </div>
        </div>
        <div className="lg:w-[45%]">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={aboutImage} alt="Profesionales en reunión" className="w-full h-full object-cover" loading="lazy" width={960} height={1200} />
          </div>
        </div>
      </div>
    </section>
  );
}
