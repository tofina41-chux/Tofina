import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blog');
        const data = await response.json();
        if (Array.isArray(data)) setPosts(data);
      } catch (err) {
        console.error("Error connecting to server insights pipeline:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-24 bg-swiss-dark dark:bg-swiss-dark px-6 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-swiss-green font-mono text-xs tracking-[0.4em] uppercase mb-3">Editorial / Streams</span>
          <h2 className="text-4xl font-black text-white dark:text-white tracking-tight">Latest Insights<span className="text-swiss-green">.</span></h2>
        </div>

        {/* Live Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id || post.title} 
              className="group bg-swiss-navy/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md hover:border-swiss-green/30 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* NEW: Dynamic Card Image Header on Grid Banner */}
                {post.imageUrl && (
                  <div className="w-full aspect-video overflow-hidden bg-swiss-dark/50 border-b border-white/5">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700" 
                    />
                  </div>
                )}
                
                {/* Content Details Block */}
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
                <div 
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center gap-2 text-xs font-mono text-white group-hover:text-swiss-green transition-colors cursor-pointer w-fit font-bold select-none"
                >
                  <span>Read System File</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && <p className="text-center font-mono text-xs text-swiss-green/60 animate-pulse py-12">Syncing insight nodes...</p>}
        {!loading && posts.length === 0 && <p className="text-center font-mono text-xs text-swiss-grey/40 py-12">No transmission segments detected.</p>}
      </div>

      {/* SYSTEM TERMINAL OVERLAY MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-swiss-dark/80">
          <div className="absolute inset-0" onClick={() => setSelectedPost(null)}></div>
          <div className="relative w-full max-w-2xl bg-swiss-navy border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
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
            
            <p className="text-white/80 text-base mercantile leading-relaxed mb-8 whitespace-pre-line">{selectedPost.excerpt}</p>
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