import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface MegaMenuItem {
  label: string;
  description: string;
  to: string;
}

interface NavItem {
  label: string;
  to?: string;
  mega?: {
    items: MegaMenuItem[];
    cta?: { label: string; to: string };
  };
}

const navItems: NavItem[] = [
  {
    label: 'SOY EMPRESA',
    mega: {
      items: [
        { label: 'Strategic Partner', description: 'Tu HRBP externo', to: '/empresa/strategic-partner' },
        { label: 'Corporative Essentials', description: 'Formalización y cumplimiento básico', to: '/empresa/essentials' },
        { label: 'Reclutamiento', description: 'Encontramos al talento ideal', to: '/empresa/reclutamiento' },
        { label: 'Auditoría y Cumplimiento', description: 'Auditoría y blindaje legal', to: '/empresa/risk-compliance' },
      ],
      cta: { label: 'Ir al Cotizador →', to: '/cotizador' },
    },
  },
  {
    label: 'SOY CANDIDATO',
    mega: {
      items: [
        { label: 'ADD Grow', description: 'Aceleración profesional', to: '/candidato/add-grow' },
        { label: 'ADD First Step', description: 'Todo lo que debes saber para inicial tu emprendimiento relacionado a Derecho Laboral', to: '/candidato/first-step' },
        { label: 'Simulaciones', description: 'Práctica de entrevistas', to: '/candidato/simulaciones' },
      ],
      cta: { label: 'Ver Vacantes →', to: '/vacantes' },
    },
  },
  {
    label: 'RECURSOS DIGITALES',
    mega: {
      items: [
        { label: 'HR Toolkit', description: 'Machotes y guías para PYMES', to: '/recursos/hr-toolkit' },
        { label: 'Learn & Save ', description: 'Curso de estrategia laboral', to: '/recursos/career-blueprint' },
        { label: 'ADD Insider Club', description: 'Comunidad exclusiva', to: '/recursos/insider-club' },
      ],
    },
  },
  {
    label: 'Blog',
    to: '/recursos/blog',
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[64px]">
          <Link to="/" className="font-serif text-[20px] font-light text-aesop-parchment tracking-tight">
            ADD Consulting
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
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

            {/* Sobre ADD button */}
            <button
              onClick={() => setAboutOpen(true)}
              className="font-sans text-[11px] font-normal uppercase tracking-[2.5px] transition-colors duration-200 cursor-pointer"
              style={{ color: 'rgba(242,237,228,0.75)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F2EDE4')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,228,0.75)')}
            >
              Sobre ADD
            </button>

            <Link
              to="/contacto"
              className="btn-ghost-light !py-2 !px-5 !text-[11px]"
            >
              Consúltanos
            </Link>
          </nav>

          <button
            className="lg:hidden text-aesop-parchment"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} strokeWidth={1} />
          </button>
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
              <p className="eyebrow-mono mb-6">· Sobre ADD Consulting</p>
              <h2 className="font-serif text-[36px] lg:text-[44px] font-light text-aesop-soil leading-[1.1]" style={{ letterSpacing: '-1px' }}>
                Una firma construida sobre criterio, no sobre volumen.
              </h2>
              <div style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }} className="my-8 w-14" />
              <p className="text-body">
                Somos una consultoría boutique especializada en Recursos Humanos y Derecho Laboral en Costa Rica.
                No ofrecemos soluciones genéricas: cada empresa y cada profesional recibe un acompañamiento diseñado
                para su realidad específica.
              </p>
              <p className="text-body mt-4">
                Nuestro equipo combina experiencia legal con visión estratégica de negocio, siempre con un enfoque
                humano y confidencial.
              </p>

              <div className="grid grid-cols-2 gap-0 mt-12">
                {[
                  { label: 'Confidencialidad', desc: 'Protección total de información sensible' },
                  { label: 'Experticia local', desc: 'Conocimiento profundo del mercado tico' },
                  { label: 'Enfoque humano', desc: 'Las personas primero, siempre' },
                  { label: 'Legislación CR', desc: 'Dominio del marco legal vigente' },
                ].map((v, i) => (
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
                  Agenda una conversación →
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

              {/* Sobre ADD in mobile */}
              <div style={{ borderBottom: '1px solid rgba(242,237,228,0.1)' }}>
                <button
                  className="block w-full text-left py-4 font-sans text-[13px] text-aesop-parchment uppercase tracking-[2px]"
                  onClick={() => { setMobileOpen(false); setAboutOpen(true); }}
                >
                  Sobre ADD
                </button>
              </div>
            </div>

            <Link
              to="/contacto"
              className="btn-ghost-light block text-center mt-8"
              onClick={() => setMobileOpen(false)}
            >
              Consúltanos
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
