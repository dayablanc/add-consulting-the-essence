import { digitalProducts } from '@/data/services';

export default function KitPymeSection() {
  return (
    <section className="bg-aesop-bark py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto section-padding">
        <p className="eyebrow-mono text-aesop-clay mb-4">· Productos Digitales</p>
        <h2 className="text-aesop-parchment text-[28px] md:text-[32px] mb-12" style={{ letterSpacing: '-0.5px' }}>
          Herramientas que trabajan cuando tú no puedes.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {digitalProducts.map((p) => (
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
              <h3 className="font-serif text-[24px] font-light text-aesop-parchment" style={{ fontStyle: 'normal' }}>{p.name}</h3>
              <p className="label-mono text-aesop-taupe mt-1">{p.audience}</p>

              <hr className="my-5" style={{ borderColor: 'rgba(242,237,228,0.15)' }} />

              <p className="font-sans text-[14px] font-light leading-relaxed" style={{ color: 'rgba(242,237,228,0.7)' }}>
                {p.description}
              </p>

              <hr className="my-5" style={{ borderColor: 'rgba(242,237,228,0.15)' }} />

              <p className="font-mono text-[20px] text-aesop-parchment mb-5">{p.price}</p>

              <button className="btn-ghost-light">
                Obtener →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
