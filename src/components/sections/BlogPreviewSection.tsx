import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/services';
import blogImage from '@/assets/blog-image.jpg';

export default function BlogPreviewSection() {
  const preview = blogPosts.slice(0, 3);

  return (
    <section className="bg-aesop-parchment py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto section-padding">
        <p className="eyebrow mb-4">· Recursos Editoriales</p>
        <h2 className="text-aesop-soil text-[28px] md:text-[32px] mb-3" style={{ letterSpacing: '-0.5px' }}>Blog</h2>
        <p className="text-body mb-12">
          Artículos sobre el mercado laboral y derecho laboral costarricense.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {preview.map((post) => (
            <article key={post.id} style={{ borderTop: '1px solid hsl(var(--aesop-rule))' }} className="pt-6">
              <div className="aspect-[3/2] overflow-hidden mb-5">
                <img
                  src={blogImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-opacity duration-200 hover:opacity-80"
                  loading="lazy"
                  width={800}
                  height={544}
                />
              </div>
              <p className="eyebrow-mono text-[10px]">{post.tag}</p>
              <h3 className="font-serif text-[22px] font-light text-aesop-soil mt-2 leading-snug" style={{ fontStyle: 'normal' }}>
                {post.title}
              </h3>
              <p className="font-mono text-[11px] text-aesop-taupe mt-2">{post.date}</p>
              <Link
                to="/recursos/blog"
                className="inline-block mt-4 font-sans text-[11px] uppercase tracking-[2px] text-aesop-clay hover:text-aesop-soil transition-all duration-200"
              >
                Leer →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
