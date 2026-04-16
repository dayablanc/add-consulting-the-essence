import { digitalProducts } from '@/data/services';
import { useI18n } from '@/i18n/context';
import { formatPrice } from '@/i18n/constants';

export default function KitPymeSection() {
  const { t, currency } = useI18n();

  return (
    <section className="bg-aesop-bark py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto section-padding">
        <p className="eyebrow-mono text-aesop-clay mb-4">{t.kitPyme.eyebrow}</p>
        <h2 className="text-aesop-parchment text-[28px] md:text-[32px] mb-12" style={{ letterSpacing: '-0.5px' }}>
          {t.kitPyme.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {digitalProducts.map((p) => {
            const translated = t.digitalProducts[p.slug] || { name: p.name, audience: p.audience, description: p.description };
            const priceUSD = parseFloat(p.price.replace('$', ''));

            return (
              <div
                key={p.id}
                className="p-8 transition-all duration-200"
                style={{
                  border: '1px solid rgba(242,237,228,0.15)',
                  background: 'rgba(242,237,228,0.04)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(242,237,228,1)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.15)')}
              >
                <h3 className="font-serif text-[24px] font-light text-aesop-parchment" style={{ fontStyle: 'normal' }}>{translated.name}</h3>
                <p className="label-mono text-aesop-taupe mt-1">{translated.audience}</p>

                <hr className="my-5" style={{ borderColor: 'rgba(242,237,228,0.15)' }} />

                <p className="font-sans text-[14px] font-light leading-relaxed" style={{ color: 'rgba(242,237,228,0.7)' }}>
                  {translated.description}
                </p>

                <hr className="my-5" style={{ borderColor: 'rgba(242,237,228,0.15)' }} />

                <p className="font-mono text-[20px] text-aesop-parchment mb-5">
                  {formatPrice(priceUSD, currency)}
                </p>

                <button className="btn-ghost-light">{t.kitPyme.obtain}</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
