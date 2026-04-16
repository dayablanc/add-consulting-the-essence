const stats = [
  { number: '+50', label: 'Empresas acompañadas' },
  { number: '+200', label: 'Candidatos orientados' },
  { number: '5 años', label: 'Experiencia en Costa Rica' },
  { number: '100%', label: 'Enfoque en legislación local' },
];

export default function StatsSection() {
  return (
    <section className="bg-aesop-white py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-[48px] lg:text-[64px] font-light text-aesop-clay leading-none">
                {s.number}
              </p>
              <p className="font-sans text-[10px] uppercase tracking-[2px] text-aesop-taupe mt-4">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
