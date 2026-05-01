import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import { useCart } from '@/cart/CartContext';
import logoAdd from '@/assets/logo-add.png';

export default function Header() {
  const { lang, setLang, currency, setCurrency, t } = useI18n();
  const { count: cartCount, setOpen: setCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItems = [
    {
      label: t.nav.forCompanies,
      mega: {
        items: [
          { label: 'Strategic Partner', description: t.megaDescriptions['strategic-partner'], to: '/empresa/strategic-partner' },
          { label: 'Corporative Essentials', description: t.megaDescriptions['essentials'], to: '/empresa/essentials' },
          { label: lang === 'es' ? 'Reclutamiento' : 'Recruitment', description: t.megaDescriptions['reclutamiento'], to: '/empresa/reclutamiento' },
          { label: lang === 'es' ? 'Auditoría y Cumplimiento' : 'Audit & Compliance', description: t.megaDescriptions['risk-compliance'], to: '/empresa/risk-compliance' },
        ],
        cta: { label: t.megaCta.cotizador, to: '/cotizador' },
      },
    },
    {
      label: t.nav.forCandidates,
      mega: {
        items: [
          { label: 'ADD Grow', description: t.megaDescriptions['add-grow'], to: '/candidato/add-grow' },
          { label: 'ADD Step Up', description: t.megaDescriptions['first-step'], to: '/candidato/first-step' },
          { label: lang === 'es' ? 'Simulaciones' : 'Simulations', description: t.megaDescriptions['simulaciones'], to: '/candidato/simulaciones' },
        ],
        cta: { label: t.megaCta.vacantes, to: '/vacantes' },
      },
    },
    {
      label: t.nav.digitalResources,
      mega: {
        items: [
          { label: 'HR Toolkit', description: t.megaDescriptions['hr-toolkit'], to: '/recursos/hr-toolkit' },
          { label: 'Learn & Save', description: t.megaDescriptions['career-blueprint'], to: '/recursos/career-blueprint' },
          { label: 'ADD Insider Club', description: t.megaDescriptions['insider-club'], to: '/recursos/insider-club' },
        ],
      },
    },
    {
      label: t.nav.blog,
      to: '/recursos/blog',
    },
  ];

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  useEffect(() => {
    if (mobileOpen || aboutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, aboutOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-aesop-bark" style={{ borderBottom: '1px solid rgba(242,237,228,0.1)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[78px] lg:h-[86px]">
          <Link to="/" className="block flex-shrink-0" aria-label="ADD HR — People Advisory">
            <img
              src={logoAdd}
              alt="ADD HR — People Advisory"
              className="h-[58px] lg:h-[68px] w-auto block"
              style={{ objectFit: 'contain' }}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega && handleMouseEnter(item.label)}
                onMouseLeave={item.mega ? handleMouseLeave : undefined}
              >
                {item.to && !item.mega ? (
                  <Link
                    to={item.to}
                    className="font-sans text-[11px] font-normal uppercase tracking-[2.5px] transition-colors duration-200"
                    style={{ color: 'rgba(242,237,228,0.75)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F2EDE4')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,228,0.75)')}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="font-sans text-[11px] font-normal uppercase tracking-[2.5px] transition-colors duration-200 cursor-pointer"
                    style={{ color: 'rgba(242,237,228,0.75)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F2EDE4')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,228,0.75)')}
                  >
                    {item.label}
                  </button>
                )}

                {item.mega && activeMenu === item.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className="bg-aesop-bark min-w-[320px] p-6"
                      style={{
                        border: '1px solid rgba(242,237,228,0.1)',
                        animation: 'megaIn 250ms ease forwards',
                      }}
                    >
                      {item.mega.items.map((mi, i) => (
                        <div key={mi.label}>
                          <Link
                            to={mi.to}
                            className="block py-3 group"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span className="font-sans text-[13px] text-aesop-parchment block transition-opacity duration-200 group-hover:opacity-80">
                              {mi.label}
                            </span>
                            <span className="font-mono text-[11px] text-aesop-taupe block mt-0.5">
                              {mi.description}
                            </span>
                          </Link>
                          {i < item.mega!.items.length - 1 && (
                            <div style={{ borderBottom: '1px solid rgba(242,237,228,0.1)' }} />
                          )}
                        </div>
                      ))}
                      {item.mega.cta && (
                        <>
                          <div style={{ borderBottom: '1px solid rgba(242,237,228,0.1)' }} className="my-2" />
                          <Link
                            to={item.mega.cta.to}
                            className="block py-2 font-sans text-[11px] uppercase tracking-[2.5px] text-aesop-clay transition-colors duration-200 hover:text-aesop-parchment"
                            onClick={() => setActiveMenu(null)}
                          >
                            {item.mega.cta.label}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div style={{ width: '1px', height: '16px', background: 'rgba(242,237,228,0.2)' }} />

            {/* About ADD button */}
            <button
              onClick={() => setAboutOpen(true)}
              className="font-sans text-[11px] font-normal uppercase tracking-[2.5px] transition-colors duration-200 cursor-pointer"
              style={{ color: 'rgba(242,237,228,0.75)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F2EDE4')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,228,0.75)')}
            >
              {t.nav.aboutAdd}
            </button>

            <Link
              to="/contacto"
              className="btn-ghost-light !py-2 !px-5 !text-[11px]"
            >
              {t.nav.contactUs}
            </Link>

            <div style={{ width: '1px', height: '16px', background: 'rgba(242,237,228,0.2)' }} />

            {/* Stacked Language + Currency toggles — aligned columns */}
            <div className="flex flex-col items-stretch gap-0.5 font-sans text-[9px] tracking-[0.5px] leading-none">
              <div className="grid grid-cols-[40px_6px_40px] items-center">
                <button
                  onClick={() => setLang('es')}
                  className="cursor-pointer transition-colors duration-200 text-center"
                  style={{
                    color: lang === 'es' ? 'hsl(var(--aesop-parchment))' : 'rgba(242,237,228,0.45)',
                    fontWeight: lang === 'es' ? 700 : 400,
                  }}
                >
                  ES
                </button>
                <span className="text-center" style={{ color: 'rgba(242,237,228,0.25)' }}>|</span>
                <button
                  onClick={() => setLang('en')}
                  className="cursor-pointer transition-colors duration-200 text-center"
                  style={{
                    color: lang === 'en' ? 'hsl(var(--aesop-parchment))' : 'rgba(242,237,228,0.45)',
                    fontWeight: lang === 'en' ? 700 : 400,
                  }}
                >
                  EN
                </button>
              </div>
              <div className="grid grid-cols-[40px_6px_40px] items-center">
                <button
                  onClick={() => setCurrency('CRC')}
                  className="cursor-pointer transition-colors duration-200 text-center"
                  style={{
                    color: 'hsl(var(--aesop-clay))',
                    fontWeight: currency === 'CRC' ? 700 : 400,
                    opacity: currency === 'CRC' ? 1 : 0.6,
                  }}
                >
                  ₡ CRC
                </button>
                <span className="text-center" style={{ color: 'rgba(242,237,228,0.25)' }}>|</span>
                <button
                  onClick={() => setCurrency('USD')}
                  className="cursor-pointer transition-colors duration-200 text-center"
                  style={{
                    color: 'hsl(var(--aesop-clay))',
                    fontWeight: currency === 'USD' ? 700 : 400,
                    opacity: currency === 'USD' ? 1 : 0.6,
                  }}
                >
                  $ USD
                </button>
              </div>
            </div>

            {/* Cart trigger (desktop) */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative ml-2 text-aesop-parchment/75 hover:text-aesop-parchment transition-colors duration-200"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={18} strokeWidth={1.25} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 flex items-center justify-center font-mono text-[10px] text-aesop-bark bg-aesop-clay leading-none"
                  style={{ borderRadius: '999px' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-aesop-parchment"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={20} strokeWidth={1} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 flex items-center justify-center font-mono text-[10px] text-aesop-bark bg-aesop-clay leading-none"
                  style={{ borderRadius: '999px' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="text-aesop-parchment"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={20} strokeWidth={1} />
            </button>
          </div>
        </div>
      </header>

      {/* About Overlay/Drawer */}
      {aboutOpen && (
        <div className="fixed inset-0 z-[200]">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(42,37,32,0.88)', backdropFilter: 'blur(6px)' }}
            onClick={() => setAboutOpen(false)}
          />
          <div
            className="absolute top-0 right-0 bottom-0 w-full max-w-[560px] bg-aesop-parchment overflow-y-auto"
            style={{ animation: 'slideInRight 300ms ease forwards' }}
          >
            <button
              className="absolute top-8 right-8 font-sans text-[18px] text-aesop-taupe hover:text-aesop-soil transition-colors duration-200"
              onClick={() => setAboutOpen(false)}
            >
              ✕
            </button>

            <div className="px-12 py-20 lg:py-24">
              <p className="eyebrow-mono mb-6">{t.aboutDrawer.eyebrow}</p>
              <h2 className="font-serif text-[28px] lg:text-[32px] font-light text-aesop-soil leading-[1.1]" style={{ letterSpacing: '-1px' }}>
                {t.aboutDrawer.heading}
              </h2>
              <div style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }} className="my-8 w-14" />
              <p className="text-body">{t.aboutDrawer.body1}</p>
              <p className="text-body mt-4">{t.aboutDrawer.body2}</p>

              <div className="grid grid-cols-2 gap-0 mt-12">
                {t.aboutDrawer.values.map((v, i) => (
                  <div
                    key={v.label}
                    className="py-6 pr-6"
                    style={{
                      borderBottom: i < 2 ? '1px solid hsl(var(--aesop-rule))' : 'none',
                      borderRight: i % 2 === 0 ? '1px solid hsl(var(--aesop-rule))' : 'none',
                      paddingLeft: i % 2 === 1 ? '24px' : '0',
                    }}
                  >
                    <span className="label-mono text-aesop-clay">{v.label}</span>
                    <p className="font-sans text-[13px] text-aesop-umber mt-2">{v.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link
                  to="/contacto"
                  className="btn-cta inline-block"
                  onClick={() => setAboutOpen(false)}
                >
                  {t.aboutDrawer.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-aesop-soil/60" onClick={() => setMobileOpen(false)} />
          <div
            className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-aesop-bark p-8 overflow-y-auto"
            style={{ animation: 'slideInRight 300ms ease forwards' }}
          >
            <button className="absolute top-6 right-6 text-aesop-parchment" onClick={() => setMobileOpen(false)}>
              <X size={20} strokeWidth={1} />
            </button>

            <div className="mt-12 space-y-0">
              {navItems.map((item) => (
                <div key={item.label} style={{ borderBottom: '1px solid rgba(242,237,228,0.1)' }}>
                  {item.to && !item.mega ? (
                    <Link
                      to={item.to}
                      className="block py-4 font-sans text-[13px] text-aesop-parchment uppercase tracking-[2px]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        className="w-full text-left py-4 font-sans text-[13px] text-aesop-parchment uppercase tracking-[2px]"
                        onClick={() => setMobileAccordion(mobileAccordion === item.label ? null : item.label)}
                      >
                        {item.label}
                        <span className="float-right text-aesop-taupe transition-transform duration-200"
                          style={{ transform: mobileAccordion === item.label ? 'rotate(45deg)' : 'none' }}>+</span>
                      </button>
                      {item.mega && mobileAccordion === item.label && (
                        <div className="pb-4 space-y-3">
                          {item.mega.items.map((mi) => (
                            <Link
                              key={mi.label}
                              to={mi.to}
                              className="block font-sans text-[13px] text-aesop-parchment/70 pl-4"
                              onClick={() => setMobileOpen(false)}
                            >
                              {mi.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* About ADD in mobile */}
              <div style={{ borderBottom: '1px solid rgba(242,237,228,0.1)' }}>
                <button
                  className="block w-full text-left py-4 font-sans text-[13px] text-aesop-parchment uppercase tracking-[2px]"
                  onClick={() => { setMobileOpen(false); setAboutOpen(true); }}
                >
                  {t.nav.aboutAdd}
                </button>
              </div>
            </div>

            {/* Mobile toggles */}
            <div className="flex items-center gap-4 mt-8">
              {/* Language */}
              <div className="flex items-center gap-0 font-sans text-[12px] tracking-[1px]">
                <button
                  onClick={() => setLang('es')}
                  className="cursor-pointer px-1"
                  style={{ color: lang === 'es' ? 'hsl(var(--aesop-clay))' : 'rgba(242,237,228,0.45)', fontWeight: lang === 'es' ? 700 : 400 }}
                >ES</button>
                <span style={{ color: 'rgba(242,237,228,0.25)' }}>|</span>
                <button
                  onClick={() => setLang('en')}
                  className="cursor-pointer px-1"
                  style={{ color: lang === 'en' ? 'hsl(var(--aesop-clay))' : 'rgba(242,237,228,0.45)', fontWeight: lang === 'en' ? 700 : 400 }}
                >EN</button>
              </div>

              <div style={{ width: '1px', height: '14px', background: 'rgba(242,237,228,0.2)' }} />

              {/* Currency */}
              <div className="flex items-center gap-0 font-sans text-[12px] tracking-[1px]">
                <button
                  onClick={() => setCurrency('CRC')}
                  className="cursor-pointer px-1"
                  style={{ color: currency === 'CRC' ? 'hsl(var(--aesop-clay))' : 'rgba(242,237,228,0.45)', fontWeight: currency === 'CRC' ? 700 : 400 }}
                >₡ CRC</button>
                <span style={{ color: 'rgba(242,237,228,0.25)' }}>|</span>
                <button
                  onClick={() => setCurrency('USD')}
                  className="cursor-pointer px-1"
                  style={{ color: currency === 'USD' ? 'hsl(var(--aesop-clay))' : 'rgba(242,237,228,0.45)', fontWeight: currency === 'USD' ? 700 : 400 }}
                >$ USD</button>
              </div>
            </div>

            <a
              href="https://calendly.com/add-consulting/cita-virtual"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-6 font-sans text-[12px] uppercase tracking-[2px] py-3 px-5 transition-colors duration-200"
              style={{ backgroundColor: 'hsl(var(--aesop-clay))', color: 'hsl(var(--aesop-parchment))' }}
              onClick={() => setMobileOpen(false)}
            >
              {lang === 'es' ? 'Agendar cita' : 'Book a meeting'}
            </a>

            <Link
              to="/contacto"
              className="btn-ghost-light block text-center mt-3"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.contactUs}
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes megaIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
