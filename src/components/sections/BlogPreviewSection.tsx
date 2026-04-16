import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/services';
import blogImage from '@/assets/blog-image.jpg';

export default function BlogPreviewSection() {
  const preview = blogPosts.slice(0, 3);

  return (
    <section className="bg-aesop-parchment py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <p className="eyebrow mb-6">· Recursos Editoriales</p>
        <h2 className="text-aesop-soil text-[40px] lg:text-[52px] mb-4">Blog</h2>
        <p className="text-body mb-16">
          Artículos sobre el mercado laboral y derecho laboral costarricense.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {preview.map((post) => (
            <article key={post.id} style={{ borderTop: '1px solid hsl(var(--aesop-rule))' }} className="pt-6">
              <div className="aspect-[3/2] overflow-hidden mb-6">
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
              <h3 className="font-serif text-[24px] font-light text-aesop-soil mt-2 leading-snug">
                {post.title}
              </h3>
              <p className="font-mono text-[11px] text-aesop-taupe mt-2">{post.date}</p>
              <Link
                to={`/recursos/blog`}
                className="inline-block mt-4 font-sans text-[11px] uppercase tracking-[2px] text-aesop-soil hover:underline transition-all duration-200"
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
