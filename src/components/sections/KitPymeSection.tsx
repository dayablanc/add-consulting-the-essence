import { digitalProducts } from '@/data/services';
import { useI18n } from '@/i18n/context';
import { formatPrice, EXCHANGE_RATE } from '@/i18n/constants';
import { useCart } from '@/cart/CartContext';
import { useNavigate } from 'react-router-dom';

export default function KitPymeSection() {
  const { t, currency } = useI18n();
  const { addItem, setOpen: setCartOpen } = useCart();
  const navigate = useNavigate();

  return (
    <section className="bg-aesop-bark py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto section-padding">
        <p className="eyebrow-mono text-gold mb-4">{t.kitPyme.eyebrow}</p>
        <h2 className="text-aesop-parchment text-[28px] md:text-[32px] mb-12" style={{ letterSpacing: '-0.5px' }}>
          {t.kitPyme.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {digitalProducts.map((p) => {
            const translated = t.digitalProducts[p.slug] || { name: p.name, audience: p.audience, description: p.description };
            const priceUSD = parseFloat(p.price.replace('$', ''));
            const priceCRC = Math.round(priceUSD * EXCHANGE_RATE);

            const handleBuy = () => {
              addItem({
                serviceId: p.id,
                slug: p.slug,
                name: translated.name,
                priceCRC,
              });
              setCartOpen(false);
              navigate('/checkout');
            };

            const handleAdd = () => {
              addItem({
                serviceId: p.id,
                slug: p.slug,
                name: translated.name,
                priceCRC,
              });
            };

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

                <div className="flex flex-wrap gap-3">
                  <button onClick={handleBuy} className="btn-ghost-light">
                    {t.kitPyme.obtain}
                  </button>
                  <button
                    onClick={handleAdd}
                    className="font-sans text-[11px] uppercase tracking-[2.5px] text-aesop-parchment/70 hover:text-aesop-parchment transition-colors py-2"
                  >
                    + Agregar al carrito
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
