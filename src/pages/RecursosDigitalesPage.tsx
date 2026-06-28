import { Link } from 'react-router-dom';
import { digitalProducts } from '@/data/services';
import { useI18n } from '@/i18n/context';
import { formatPrice, EXCHANGE_RATE } from '@/i18n/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { ArrowRight } from 'lucide-react';

export default function RecursosDigitalesPage() {
  const { t, currency } = useI18n();

  return (
    <div className="min-h-screen bg-aesop-white">
      <Header />
      <main className="max-w-[1200px] mx-auto section-padding pt-32 pb-20">
        <BackButton />
        <p className="eyebrow-mono mb-4 mt-6">{t.kitPyme.eyebrow}</p>
        <h1 className="font-serif text-[44px] md:text-[64px] lg:text-[84px] text-aesop-bark mb-4" style={{ letterSpacing: '-1px', lineHeight: 1 }}>
          {t.kitPyme.heading}
        </h1>
        <p className="font-sans text-[14px] text-aesop-umber font-light max-w-[600px] mb-16">
          Todo lo que necesitas, listo para usar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {digitalProducts.map((p) => {
            const translated = t.digitalProducts[p.slug] || { name: p.name, audience: p.audience, description: p.description };
            const priceUSD = parseFloat(p.price.replace('$', ''));
            return (
              <Link
                key={p.id}
                to={`/recursos/${p.slug}`}
                className="group flex flex-col p-8 bg-aesop-white transition-all duration-200"
                style={{ border: '1px solid hsl(var(--aesop-rule))', borderRadius: '24px' }}
              >
                <h3 className="font-serif text-[24px] text-aesop-soil mb-2" style={{ fontStyle: 'normal' }}>{translated.name}</h3>
                <p className="label-mono text-aesop-umber mb-4">{translated.audience}</p>
                <p className="font-sans text-[14px] text-aesop-umber font-light leading-relaxed mb-6 line-clamp-3">
                  {translated.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-mono text-[16px] text-aesop-bark">{formatPrice(priceUSD, currency)}</span>
                  <ArrowRight size={16} strokeWidth={1.5} className="text-aesop-clay group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
