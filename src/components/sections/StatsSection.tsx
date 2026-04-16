const stats = [
  { number: '50+', label: 'Empresas' },
  { number: '200+', label: 'Colocaciones' },
  { number: '8', label: 'Años de experiencia' },
];

const testimonials = [
  {
    quote: 'ADD transformó nuestra gestión de talento. Pasamos de improvisar a tener procesos claros y legales.',
    name: 'María Fernández',
    title: 'Gerente de Operaciones',
    company: 'TechCR Solutions',
  },
  {
    quote: 'Gracias al programa ADD Grow, conseguí una posición que realmente se alinea con mi perfil profesional.',
    name: 'Carlos Rojas',
    title: 'Analista Senior',
    company: 'Grupo Financiero Nacional',
  },
];

export default function StatsSection() {
  return (
    <section className="bg-aesop-bark py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto section-padding">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 text-center mb-20">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-[48px] lg:text-[64px] font-light text-aesop-parchment leading-none" style={{ fontStyle: 'normal' }}>
                {s.number}
              </p>
              <p className="font-sans text-[11px] uppercase tracking-[2px] mt-3" style={{ color: 'hsla(37, 33%, 92%, 0.6)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8"
              style={{ border: '1px solid rgba(242,237,228,0.12)' }}
            >
              <p className="font-serif text-[18px] font-light text-aesop-parchment leading-relaxed mb-6" style={{ fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              <div>
                <p className="font-sans text-[14px] text-aesop-parchment font-normal">{t.name}</p>
                <p className="font-mono text-[11px] mt-1" style={{ color: 'hsla(37, 33%, 92%, 0.5)' }}>
                  {t.title} · {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
