import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { services } from '@/data/services';
import { useI18n } from '@/i18n/context';
import { Users, Scale, Building2, BookOpen, TrendingUp, Shield, Rocket, Mic, FileText, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6 text-aesop-clay" strokeWidth={1.5} />,
  scale: <Scale className="w-6 h-6 text-aesop-clay" strokeWidth={1.5} />,
  building: <Building2 className="w-6 h-6 text-aesop-clay" strokeWidth={1.5} />,
  'book-open': <BookOpen className="w-6 h-6 text-aesop-clay" strokeWidth={1.5} />,
  'trending-up': <TrendingUp className="w-6 h-6 text-aesop-clay" strokeWidth={1.5} />,
  'file-text': <FileText className="w-6 h-6 text-aesop-clay" strokeWidth={1.5} />,
  shield: <Shield className="w-6 h-6 text-aesop-clay" strokeWidth={1.5} />,
  rocket: <Rocket className="w-6 h-6 text-aesop-clay" strokeWidth={1.5} />,
  mic: <Mic className="w-6 h-6 text-aesop-clay" strokeWidth={1.5} />,
};

export default function ServicesSection() {
  const { t } = useI18n();

  const b2bCards = services.filter(s => s.category === 'empresa' && s.showInCards);
  const b2cOrder = ['cv-rewrite', 'first-step', 'add-grow', 'simulaciones'];
  const b2cCards = services
    .filter(s => s.category === 'candidato' && s.showInCards)
    .sort((a, b) => b2cOrder.indexOf(a.id) - b2cOrder.indexOf(b.id));

  const getServiceText = (s: typeof services[0]) => {
    const translated = t.serviceItems[s.id];
    return translated || { name: s.name, description: s.description, includes: s.includes };
  };

  const renderServiceCard = (s: typeof services[0]) => {
    const text = getServiceText(s);
    const isB2C = s.category === 'candidato';
    const servicePath = `/${s.category}/${s.slug}`;
    return (
      <div
        key={s.id}
        className="group flex flex-col justify-between p-8 bg-aesop-white transition-all duration-200 snap-start shrink-0 w-[85%] sm:w-[55%] md:w-[42%] lg:w-[280px]"
        style={{ border: '1px solid hsl(var(--aesop-rule))', borderRadius: '24px' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'hsl(var(--aesop-clay))'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'hsl(var(--aesop-rule))'; }}
      >
        <div>
          <div className="mb-5">{iconMap[s.icon]}</div>
          <h3 className="font-serif text-[22px] lg:text-[24px] text-aesop-soil mb-3" style={{ letterSpacing: '-0.3px', fontStyle: 'normal' }}>
            {text.name}
          </h3>
          <p className="font-sans text-[15px] text-aesop-umber font-light leading-relaxed line-clamp-3">
            {text.description}
          </p>
        </div>
        <Link
          to={servicePath}
          className="btn-cta-slim mt-6 inline-flex items-center justify-center gap-2 self-start"
        >
          {isB2C ? 'Más información' : 'Ver servicio completo'}
          <ArrowRight size={12} strokeWidth={1.5} />
        </Link>
      </div>
    );
  };

  const Carousel = ({ items }: { items: typeof services }) => {
    const ref = useRef<HTMLDivElement>(null);
    const scrollBy = (dir: number) => {
      if (!ref.current) return;
      const amount = ref.current.clientWidth * 0.8 * dir;
      ref.current.scrollBy({ left: amount, behavior: 'smooth' });
    };
    return (
      <div className="flex items-center gap-3">
        <button
          aria-label="Anterior"
          onClick={() => scrollBy(-1)}
          className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-aesop-white border border-aesop-rule items-center justify-center hover:bg-aesop-parchment transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-aesop-bark" strokeWidth={1.5} />
        </button>
        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 flex-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map(s => renderServiceCard(s))}
        </div>
        <button
          aria-label="Siguiente"
          onClick={() => scrollBy(1)}
          className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-aesop-white border border-aesop-rule items-center justify-center hover:bg-aesop-parchment transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-aesop-bark" strokeWidth={1.5} />
        </button>
      </div>
    );
  };

  return (
    <section className="bg-aesop-white pt-6 lg:pt-8 pb-12 lg:pb-16">
      <div className="max-w-[1200px] mx-auto section-padding">

        <h2 className="font-serif text-[36px] md:text-[44px] lg:text-[52px] text-aesop-clay mb-10" style={{ letterSpacing: '-0.5px' }}>
          {t.services.heading}
        </h2>

        {/* B2C */}
        <div className="mb-12">
          <p className="eyebrow mb-6">{t.services.b2cEyebrow}</p>
          <Carousel items={b2cCards} />
        </div>

        <div style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }} className="mb-12" />

        {/* B2B */}
        <div className="mb-0">
          <p className="eyebrow mb-6">{t.services.b2bEyebrow}</p>
          <Carousel items={b2bCards} />
        </div>

      </div>
    </section>
  );
}
