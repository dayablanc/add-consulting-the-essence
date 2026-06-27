import { useI18n } from '@/i18n/context';

export default function StatsSection() {
  const { t } = useI18n();

  const stats = [
    { number: '6+', label: t.stats.companies },
    { number: '50+', label: t.stats.placements },
    { number: '1', label: t.stats.experience },
  ];

  return (
    <section className="bg-aesop-white py-10 lg:py-12">
      <div className="max-w-[1200px] mx-auto section-padding">
        <div className="grid grid-cols-3 gap-8 text-center mb-10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-[48px] lg:text-[64px] font-light text-aesop-soil leading-none" style={{ fontStyle: 'normal' }}>
                {s.number}
              </p>
              <p className="font-sans text-[11px] uppercase tracking-[2px] mt-3 text-aesop-umber">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.stats.testimonials.map((tm) => (
            <div key={tm.name} className="p-8" style={{ border: '1px solid hsl(var(--aesop-rule))' }}>
              <p className="font-serif text-[18px] font-light text-aesop-soil leading-relaxed mb-6" style={{ fontStyle: 'italic' }}>
                "{tm.quote}"
              </p>
              <div>
                <p className="font-sans text-[14px] text-aesop-soil font-normal">{tm.name}</p>
                <p className="font-mono text-[11px] mt-1 text-aesop-taupe">
                  {tm.title} · {tm.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
