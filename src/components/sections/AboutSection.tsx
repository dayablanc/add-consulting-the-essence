import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import aboutImage from '@/assets/about-image.jpg';

export default function AboutSection() {
  const { t } = useI18n();

  return (
    <section className="bg-aesop-white pt-12 lg:pt-16 pb-10 lg:pb-12">
      <div className="max-w-[1200px] mx-auto section-padding">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image - left side */}
          <div className="lg:w-[40%] order-1">
            <div className="max-w-[320px] lg:max-w-[360px] mx-auto lg:mx-0 aspect-[16/10] overflow-hidden">
              <img 
                src={aboutImage} 
                alt="Profesionales en reunión" 
                className="w-full h-full object-cover" 
                loading="lazy" 
                width={360} 
                height={225} 
              />
            </div>
          </div>

          {/* Text content - right side */}
          <div className="lg:w-[60%] order-2">
            <p className="eyebrow mb-3">{t.about.eyebrow}</p>
            <h2 className="text-aesop-soil text-[26px] md:text-[30px]" style={{ letterSpacing: '-0.5px' }}>
              {t.about.heading}
            </h2>
            <p className="text-body mt-4">{t.about.body}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/vacantes" className="btn-ghost">{t.about.ctaVacancies}</Link>
              <Link to="/empresa/reclutamiento" className="btn-cta">{t.about.ctaRecruit}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
