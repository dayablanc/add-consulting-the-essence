import { digitalProducts } from '@/data/services';

export default function KitPymeSection() {
  return (
    <section className="bg-aesop-bark py-24 lg:py-32">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <p className="eyebrow-mono text-aesop-clay mb-6">· Productos Digitales</p>
        <h2 className="text-aesop-parchment text-[40px] lg:text-[52px] xl:text-[56px] mb-16" style={{ letterSpacing: '-1px' }}>
          Herramientas que trabajan cuando tú no puedes.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {digitalProducts.map((p) => (
            <div
              key={p.id}
              className="p-8 lg:p-10 transition-all duration-200"
              style={{
                border: '1px solid rgba(242,237,228,0.15)',
                background: 'rgba(242,237,228,0.04)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(242,237,228,1)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.15)')}
            >
              <h3 className="font-serif text-[28px] font-light text-aesop-parchment">{p.name}</h3>
              <p className="label-mono text-aesop-taupe mt-1">{p.audience}</p>

              <hr className="my-6" style={{ borderColor: 'rgba(242,237,228,0.15)' }} />

              <p className="font-sans text-[14px] font-light leading-relaxed" style={{ color: 'rgba(242,237,228,0.7)' }}>
                {p.description}
              </p>

              <hr className="my-6" style={{ borderColor: 'rgba(242,237,228,0.15)' }} />

              <p className="font-mono text-[22px] text-aesop-parchment mb-6">{p.price}</p>

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
