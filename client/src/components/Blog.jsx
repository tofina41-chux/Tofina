import React, { useState } from 'react';

const posts = [
  {
    id: 1,
    title: 'Building Resilient Interfaces for Real Users',
    excerpt: 'Crafted a modular React architecture that scales across product lines while keeping the UX responsive, accessible, and brand-led.',
    category: 'Design',
    date: 'May 2026',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'MERN Workflows in Production',
    excerpt: 'Reduced deployment friction with a reusable backend pattern and automated sync between client, API, and cloud storage.',
    category: 'Engineering',
    date: 'April 2026',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Optimizing Digital Assets for Speed',
    excerpt: 'A practical guide to image delivery, asset caching, and content-first load performance for modern marketing sites.',
    category: 'Optimization',
    date: 'March 2026',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80'
  }
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="blog" className="py-24 bg-swiss-dark dark:bg-swiss-dark px-6 border-t border-white/5 relative scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-swiss-green font-mono text-xs tracking-[0.4em] uppercase mb-3">Editorial / Streams</span>
          <h2 className="text-4xl font-black text-white dark:text-white tracking-tight">Latest Insights<span className="text-swiss-green">.</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group bg-swiss-navy/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md hover:border-swiss-green/30 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {post.imageUrl && (
                  <div className="w-full aspect-video overflow-hidden bg-swiss-dark/50 border-b border-white/5">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
                    />
                  </div>
                )}

                <div className="p-8">
                  <div className="flex justify-between items-center mb-4 font-mono text-[10px] text-swiss-grey">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-swiss-green font-bold">{post.category}</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-xl font-black text-white tracking-tight mb-3 group-hover:text-swiss-green transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-swiss-grey/80 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center gap-2 text-xs font-mono text-white group-hover:text-swiss-green transition-colors cursor-pointer w-fit font-bold select-none"
                >
                  <span>Read System File</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-swiss-dark/80">
          <div className="absolute inset-0" onClick={() => setSelectedPost(null)}></div>
          <div className="relative w-full max-w-2xl bg-swiss-navy border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6 font-mono text-xs text-swiss-grey">
              <span className="text-swiss-green uppercase tracking-widest">[ FILE: {selectedPost.category} ]</span>
              <span>{selectedPost.date}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-6 leading-tight">{selectedPost.title}</h3>
            {selectedPost.imageUrl && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/5 mb-6">
                <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>
            )}
            <p className="text-white/80 text-base leading-relaxed mb-8 whitespace-pre-line">{selectedPost.excerpt}</p>
            <div className="flex justify-end border-t border-white/5 pt-6">
              <button onClick={() => setSelectedPost(null)} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase rounded-xl border border-white/10 transition-all">Close File Terminal</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
