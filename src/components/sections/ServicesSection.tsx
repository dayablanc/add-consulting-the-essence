import { Link } from 'react-router-dom';
import { services } from '@/data/services';
import { useI18n } from '@/i18n/context';
import { Users, Scale, Building2, BookOpen, TrendingUp, Shield, Rocket, Mic, FileText, ArrowRight } from 'lucide-react';

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
        className="group flex flex-col justify-between p-8 bg-aesop-white transition-all duration-200"
        style={{ border: '1px solid hsl(var(--aesop-rule))' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'hsl(var(--aesop-clay))'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'hsl(var(--aesop-rule))'; }}
      >
        <div>
          <div className="mb-5">{iconMap[s.icon]}</div>
          <h3 className="font-serif text-[22px] lg:text-[24px] text-aesop-soil mb-3" style={{ letterSpacing: '-0.3px', fontStyle: 'normal' }}>
            {text.name}
          </h3>
          <p className="font-sans text-[15px] text-aesop-umber font-light leading-relaxed line-clamp-2">
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

  return (
    <section className="bg-aesop-white pt-6 lg:pt-8 pb-20 lg:pb-28">
      <div className="max-w-[1200px] mx-auto section-padding">
        <p className="font-serif text-aesop-clay text-[36px] md:text-[44px] lg:text-[52px] mb-5 leading-[1.05]" style={{ letterSpacing: '-1px', fontStyle: 'normal' }}>
          {t.services.eyebrow.replace(/^·\s*/, '')}
        </p>
        <h2 className="text-aesop-soil text-[16px] md:text-[18px] mb-5 max-w-[400px]" style={{ letterSpacing: '-0.3px' }}>
          {t.services.heading}
        </h2>
        <p className="text-body max-w-[600px] mb-16">{t.services.subtitle}</p>

        {/* B2C */}
        <div className="mb-20">
          <p className="eyebrow mb-3">{t.services.b2cEyebrow}</p>
          <p className="font-serif text-[24px] lg:text-[28px] text-aesop-soil mb-2" style={{ letterSpacing: '-0.5px', fontStyle: 'normal' }}>
            {t.services.b2cTitle}
          </p>
          <p className="text-body mb-10 max-w-[500px]">{t.services.b2cSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {b2cCards.map(s => renderServiceCard(s))}
          </div>
        </div>

        <div style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }} className="mb-20" />

        {/* B2B */}
        <div className="mb-20">
          <p className="eyebrow mb-3">{t.services.b2bEyebrow}</p>
          <p className="font-serif text-[24px] lg:text-[28px] text-aesop-soil mb-2" style={{ letterSpacing: '-0.5px', fontStyle: 'normal' }}>
            {t.services.b2bTitle}
          </p>
          <p className="text-body mb-10 max-w-[500px]">{t.services.b2bSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {b2bCards.map(s => renderServiceCard(s))}
          </div>
        </div>

      </div>
    </section>
  );
}
