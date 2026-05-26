import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useCart } from '@/cart/CartContext';
import { useI18n } from '@/i18n/context';
import { formatPriceCRC } from '@/i18n/constants';
import { services } from '@/data/services';

export default function CheckoutPage() {
  const { items, totalCRC, clear } = useCart();
  const { currency } = useI18n();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    // Simulación de pago — en el futuro integrar Stripe.
    setTimeout(() => {
      // Separar items que requieren un formulario externo (ej. Modificación de CV)
      // de los que requieren agendar una cita.
      const formUrls: string[] = [];
      const bookingSlugs: string[] = [];
      for (const item of items) {
        const svc = services.find((s) => s.id === item.serviceId);
        if (svc?.postPurchaseFormUrl) {
          formUrls.push(svc.postPurchaseFormUrl);
        } else {
          bookingSlugs.push(item.slug);
        }
      }
      clear();
      // Abrir formularios externos en nuevas pestañas.
      formUrls.forEach((url) => window.open(url, '_blank', 'noopener,noreferrer'));

      if (bookingSlugs.length > 0) {
        navigate(`/contacto?service=${encodeURIComponent(bookingSlugs.join(','))}&purchased=1`);
      } else if (formUrls.length > 0) {
        // Solo formularios: redirigir al primero también en la pestaña actual como fallback.
        window.location.href = formUrls[0];
      } else {
        navigate('/');
      }
    }, 600);
  };


  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px]">
        <section className="bg-aesop-bark py-6 lg:py-8">
          <div className="max-w-[900px] mx-auto px-6 lg:px-12">
            <p className="eyebrow-mono text-aesop-parchment mb-4">· Checkout</p>
            <h1 className="text-aesop-parchment text-[40px] lg:text-[56px] font-serif font-light">
              Confirma tu compra
            </h1>
          </div>
        </section>

        <section className="bg-aesop-white py-16 lg:py-24">
          <div className="max-w-[900px] mx-auto px-6 lg:px-12">
            {items.length === 0 ? (
              <div className="text-center">
                <p className="text-body mb-8">Tu carrito está vacío.</p>
                <Link to="/candidato" className="btn-cta inline-block">Ver servicios</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
                {/* Order summary */}
                <div>
                  <p className="eyebrow mb-6">· Resumen del pedido</p>
                  <ul className="mb-8">
                    {items.map((item) => (
                      <li
                        key={item.key}
                        className="py-5 flex items-start justify-between gap-6"
                        style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}
                      >
                        <div>
                          <p className="font-serif text-[20px] text-aesop-soil leading-tight">{item.name}</p>
                          {item.variantLabel && (
                            <p className="label-mono text-aesop-clay mt-1">{item.variantLabel}</p>
                          )}
                          <p className="font-mono text-[12px] text-aesop-umber mt-2">Cantidad: {item.qty}</p>
                        </div>
                        <span className="font-mono text-[14px] text-aesop-soil whitespace-nowrap">
                          {formatPriceCRC(item.priceCRC * item.qty, currency)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-aesop-cream p-6">
                    <p className="label-mono text-aesop-clay mb-2">· Importante</p>
                    <p className="text-body text-[14px]">
                      El pago en línea aún no está habilitado. Al confirmar, te llevaremos
                      a los siguientes pasos: para servicios con cita, al formulario de
                      agendamiento; para Modificación de CV, al formulario donde nos
                      compartirás tu información. Te enviaremos las instrucciones de pago
                      por correo.
                    </p>
                  </div>
                </div>

                {/* Total + confirm */}
                <aside>
                  <form
                    onSubmit={handleConfirm}
                    className="bg-aesop-cream p-8 sticky top-[88px]"
                    style={{ border: '1px solid hsl(var(--aesop-rule))' }}
                  >
                    <p className="eyebrow-mono mb-6">· Total</p>
                    <div className="flex items-baseline justify-between mb-8">
                      <span className="font-sans text-[14px] text-aesop-umber">A pagar</span>
                      <span className="font-mono text-[24px] text-aesop-soil">
                        {formatPriceCRC(totalCRC, currency)}
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-cta w-full text-center disabled:opacity-50"
                    >
                      {submitting ? 'Procesando…' : 'Confirmar y agendar →'}
                    </button>
                    <Link
                      to="/candidato"
                      className="block text-center mt-4 font-sans text-[12px] uppercase tracking-[2px] text-aesop-umber hover:text-aesop-soil transition-colors"
                    >
                      Seguir comprando
                    </Link>
                  </form>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
