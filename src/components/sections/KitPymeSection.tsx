import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { digitalProducts } from '@/data/services';
import { useI18n } from '@/i18n/context';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function KitPymeSection() {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8 * dir;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="bg-aesop-bark py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto section-padding">
        <p className="eyebrow-mono text-aesop-parchment/70 mb-4">{t.kitPyme.eyebrow}</p>
        <h2
          className="font-serif text-aesop-parchment text-[28px] md:text-[36px] lg:text-[44px] mb-3"
          style={{ letterSpacing: '-0.5px', lineHeight: 1.05, fontStyle: 'normal' }}
        >
          {t.kitPyme.heading}
        </h2>
        <p className="font-sans text-[13px] font-light max-w-[520px] mb-10" style={{ color: 'rgba(242,237,228,0.6)' }}>
          Todo lo que necesitas, a un sólo clic.&nbsp;
        </p>

        <div className="flex items-center gap-3 mb-10">
          <button
            aria-label="Anterior"
            onClick={() => scrollBy(-1)}
            className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-aesop-parchment border border-aesop-rule items-center justify-center hover:bg-aesop-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-aesop-bark" strokeWidth={1.5} />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 flex-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {digitalProducts.map((p) => {
              const translated = t.digitalProducts[p.slug] || { name: p.name, audience: p.audience, description: p.description };
              return (
                <Link
                  key={p.id}
                  to={`/recursos/${p.slug}`}
                  className="group flex items-start justify-between gap-4 p-5 transition-all duration-200 snap-start shrink-0 w-[85%] sm:w-[55%] md:w-[42%] lg:w-[280px]"
                  style={{
                    border: '1px solid rgba(242,237,228,0.15)',
                    borderRadius: '24px',
                    background: 'rgba(242,237,228,0.04)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.15)')}
                >
                  <div className="min-w-0">
                    <h3 className="font-serif text-[18px] text-aesop-parchment mb-1 truncate" style={{ fontStyle: 'normal' }}>
                      {translated.name}
                    </h3>
                    <p className="font-sans text-[12px] font-light leading-snug line-clamp-3" style={{ color: 'rgba(242,237,228,0.6)' }}>
                      {translated.description}
                    </p>
                  </div>
                  <ArrowRight size={16} strokeWidth={1.5} className="text-aesop-parchment/70 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>
          <button
            aria-label="Siguiente"
            onClick={() => scrollBy(1)}
            className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-aesop-parchment border border-aesop-rule items-center justify-center hover:bg-aesop-white transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-aesop-bark" strokeWidth={1.5} />
          </button>
        </div>

        <Link
          to="/recursos-digitales"
          className="btn-cta inline-flex items-center gap-2"
        >
          EXPLORAR TODOS LOS RECURSOS DIGITALES
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
