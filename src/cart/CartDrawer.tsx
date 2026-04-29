import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/cart/CartContext';
import { useI18n } from '@/i18n/context';
import { formatPriceCRC } from '@/i18n/constants';

export default function CartDrawer() {
  const { items, totalCRC, open, setOpen, removeItem, updateQty } = useCart();
  const { currency } = useI18n();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[210]">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(42,37,32,0.88)', backdropFilter: 'blur(6px)' }}
        onClick={() => setOpen(false)}
      />
      <aside
        className="absolute top-0 right-0 bottom-0 w-full max-w-[460px] bg-aesop-parchment overflow-y-auto flex flex-col"
        style={{ animation: 'slideInRight 300ms ease forwards' }}
      >
        <div className="flex items-center justify-between px-8 py-6" style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
          <p className="eyebrow-mono">· Tu carrito</p>
          <button
            onClick={() => setOpen(false)}
            className="text-aesop-taupe hover:text-aesop-soil transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={20} strokeWidth={1} />
          </button>
        </div>

        <div className="flex-1 px-8 py-8">
          {items.length === 0 ? (
            <p className="text-body">Tu carrito está vacío.</p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.key} className="pb-6" style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-serif text-[18px] text-aesop-soil leading-tight">
                        {item.name}
                      </p>
                      {item.variantLabel && (
                        <p className="label-mono text-aesop-clay mt-1">{item.variantLabel}</p>
                      )}
                      <p className="font-mono text-[13px] text-aesop-umber mt-2">
                        {formatPriceCRC(item.priceCRC, currency)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-aesop-taupe hover:text-aesop-clay transition-colors"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={16} strokeWidth={1.25} />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => updateQty(item.key, item.qty - 1)}
                      className="w-7 h-7 flex items-center justify-center text-aesop-soil hover:bg-aesop-cream"
                      style={{ border: '1px solid hsl(var(--aesop-rule))' }}
                      aria-label="Disminuir"
                    >
                      <Minus size={12} strokeWidth={1.5} />
                    </button>
                    <span className="font-mono text-[13px] text-aesop-soil w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.key, item.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center text-aesop-soil hover:bg-aesop-cream"
                      style={{ border: '1px solid hsl(var(--aesop-rule))' }}
                      aria-label="Aumentar"
                    >
                      <Plus size={12} strokeWidth={1.5} />
                    </button>
                    <span className="ml-auto font-mono text-[13px] text-aesop-soil">
                      {formatPriceCRC(item.priceCRC * item.qty, currency)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-8 py-6" style={{ borderTop: '1px solid hsl(var(--aesop-rule))' }}>
            <div className="flex items-baseline justify-between mb-5">
              <span className="eyebrow-mono">· Total</span>
              <span className="font-mono text-[20px] text-aesop-soil">
                {formatPriceCRC(totalCRC, currency)}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="btn-cta block text-center"
            >
              Finalizar compra →
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
