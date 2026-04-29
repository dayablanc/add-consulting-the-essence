import { useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '@/data/services';
import { useI18n } from '@/i18n/context';
import QuoteModal from '@/components/QuoteModal';
import { Users, Scale, Building2, BookOpen, TrendingUp, Shield, Rocket, Mic, FileText, ArrowRight, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

const iconMapSmall: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  scale: <Scale className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  building: <Building2 className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  'book-open': <BookOpen className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  'trending-up': <TrendingUp className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  'file-text': <FileText className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  shield: <Shield className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  rocket: <Rocket className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
  mic: <Mic className="w-5 h-5 text-aesop-clay" strokeWidth={1.5} />,
};

export default function ServicesSection() {
  const { t } = useI18n();
  const [quoteService, setQuoteService] = useState<string | null>(null);

  const b2bCards = services.filter(s => s.category === 'empresa' && s.showInCards);
  const b2cCards = services.filter(s => s.category === 'candidato' && s.showInCards);

  const getServiceText = (s: typeof services[0]) => {
    const translated = t.serviceItems[s.id];
    return translated || { name: s.name, description: s.description, includes: s.includes };
  };

  const renderServiceCard = (s: typeof services[0]) => {
    const text = getServiceText(s);
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
        <button
          onClick={() => setQuoteService(text.name)}
          className="mt-6 inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[2px] text-aesop-clay cursor-pointer transition-all duration-200 group-hover:gap-3"
        >
          {t.services.requestInfo}
          <ArrowRight size={14} strokeWidth={1.5} />
        </button>
      </div>
    );
  };

  return (
    <section className="bg-aesop-cream py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto section-padding">
        <p className="eyebrow mb-4">{t.services.eyebrow}</p>
        <h2 className="text-aesop-soil text-[28px] md:text-[32px] mb-4" style={{ letterSpacing: '-0.5px' }}>
          {t.services.heading}
        </h2>
        <p className="text-body max-w-[600px] mb-16">{t.services.subtitle}</p>

        {/* B2B */}
        <div className="mb-20">
          <p className="eyebrow mb-3">{t.services.b2bEyebrow}</p>
          <p className="font-serif text-[24px] lg:text-[28px] text-aesop-soil mb-2" style={{ letterSpacing: '-0.5px', fontStyle: 'normal' }}>
            {t.services.b2bTitle}
          </p>
          <p className="text-body mb-10 max-w-[500px]">{t.services.b2bSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b2bCards.map(s => renderServiceCard(s))}
          </div>
        </div>

        <div style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }} className="mb-20" />

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

        <div style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }} className="mb-16" />

        {/* Full services accordion */}
        <div>
          <p className="eyebrow mb-3">· Catálogo completo</p>
          <p className="font-serif text-[24px] lg:text-[28px] text-aesop-soil mb-10" style={{ letterSpacing: '-0.5px', fontStyle: 'normal' }}>
            Explora todos nuestros servicios y obtén una cotización en tiempo real
          </p>
          <Accordion type="single" collapsible className="w-full">
            {services.map((s) => {
              const text = getServiceText(s);
              return (
                <AccordionItem
                  key={s.id}
                  value={s.id}
                  style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}
                  className="border-b"
                >
                  <AccordionTrigger className="hover:no-underline py-6 group">
                    <div className="flex items-center gap-4 text-left">
                      {iconMapSmall[s.icon]}
                      <span className="font-serif text-[20px] lg:text-[22px] text-aesop-soil font-normal" style={{ letterSpacing: '-0.3px' }}>
                        {text.name}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-9">
                    <p className="text-body mb-4 max-w-[680px]">{text.description}</p>
                    {text.includes && text.includes.length > 0 && (
                      <ul className="space-y-1.5 mb-5">
                        {text.includes.map((item, i) => (
                          <li key={i} className="font-sans text-[14px] text-aesop-umber font-light flex items-start gap-2">
                            <span className="text-aesop-clay mt-1">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <button
                      onClick={() => setQuoteService(text.name)}
                      className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[2px] text-aesop-clay cursor-pointer transition-all duration-200 hover:gap-3"
                    >
                      {t.services.requestInfo}
                      <ArrowRight size={14} strokeWidth={1.5} />
                    </button>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>

      <QuoteModal
        open={!!quoteService}
        onClose={() => setQuoteService(null)}
        serviceName={quoteService || undefined}
      />
    </section>
  );
}
