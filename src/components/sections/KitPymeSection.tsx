import { Link } from 'react-router-dom';
import { digitalProducts } from '@/data/services';
import { useI18n } from '@/i18n/context';
import { ArrowRight } from 'lucide-react';

export default function KitPymeSection() {
  const { t } = useI18n();

  return (
    <section className="bg-aesop-bark py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto section-padding">
        <p className="eyebrow-mono text-aesop-parchment/70 mb-4">{t.kitPyme.eyebrow}</p>
        <h2
          className="font-serif text-aesop-parchment text-[44px] md:text-[64px] lg:text-[84px] mb-3"
          style={{ letterSpacing: '-1px', lineHeight: 1, fontStyle: 'normal' }}
        >
          {t.kitPyme.heading}
        </h2>
        <p className="font-sans text-[13px] font-light max-w-[520px] mb-10" style={{ color: 'rgba(242,237,228,0.6)' }}>
          Todo lo que necesitas, a un sólo clic.&nbsp;
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {digitalProducts.map((p) => {
            const translated = t.digitalProducts[p.slug] || { name: p.name, audience: p.audience, description: p.description };
            return (
              <Link
                key={p.id}
                to={`/recursos/${p.slug}`}
                className="group flex items-start justify-between gap-4 p-5 transition-all duration-200"
                style={{
                  border: '1px solid rgba(242,237,228,0.15)',
                  borderRadius: '20px',
                  background: 'rgba(242,237,228,0.04)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.15)')}
              >
                <div className="min-w-0">
                  <h3 className="font-serif text-[18px] text-aesop-parchment mb-1 truncate" style={{ fontStyle: 'normal' }}>
                    {translated.name}
                  </h3>
                  <p className="font-sans text-[12px] font-light leading-snug line-clamp-2" style={{ color: 'rgba(242,237,228,0.6)' }}>
                    {translated.description}
                  </p>
                </div>
                <ArrowRight size={16} strokeWidth={1.5} className="text-aesop-parchment/70 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            );
          })}
        </div>

        <Link
          to="/recursos-digitales"
          className="btn-cta inline-flex items-center gap-2"
        >
          Explorar recursos digitales
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
