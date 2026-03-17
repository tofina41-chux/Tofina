const Blog = () => {
  const posts = [
    {
      title: "My AWS Journey: From Localhost to Cloud",
      date: "March 2026",
      excerpt: "Transitioning from traditional hosting to AWS S3 and EC2. Here is what I learned about cloud architecture...",
      category: "AWS / Cloud"
    },
    {
      title: "Building Frictionless UX for Local Businesses",
      date: "Feb 2026",
      excerpt: "How I used React and automation to help a restaurant in Kenya grow their digital presence.",
      category: "UX Design"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-swiss-dark px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">Latest <span className="text-swiss-green">Insights</span></h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="p-1 bg-gradient-to-br from-white/10 to-transparent rounded-3xl transition-all group-hover:from-swiss-green/50">
                <div className="bg-swiss-navy p-8 rounded-[1.4rem]">
                  <span className="text-swiss-green font-mono text-xs uppercase tracking-widest">{post.category}</span>
                  <h3 className="text-2xl font-bold text-white mt-4 mb-4 group-hover:text-swiss-green transition-colors">{post.title}</h3>
                  <p className="text-swiss-grey leading-relaxed mb-6">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 text-xs">{post.date}</span>
                    <span className="text-swiss-green font-bold text-sm tracking-tighter">READ STORY →</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;