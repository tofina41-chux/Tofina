import React, { useState } from 'react';

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  // Blog input hooks
  const [blogForm, setBlogForm] = useState({ title: '', category: '', excerpt: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "YourSuperSecretPasswordHere") { // Needs to match your server .env key
      setIsAuthenticated(true);
      setStatus("Access Granted. Systems Online.");
    } else {
      setStatus("Invalid Credentials.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);
    setUploading(true);
    setStatus("Streaming asset to core server...");

    try {
      const response = await fetch('http://localhost:5000/api/upload-profile', {
        method: 'POST',
        headers: { 'x-admin-auth': password },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus("✅ Profile image updated successfully!");
      } else {
        setStatus(`❌ Upload Failed: ${data.message}`);
      }
    } catch (err) {
      setStatus("Error streaming asset to server infrastructure.");
    } finally {
      setUploading(false);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setStatus("Publishing content node to production feed...");

    try {
      const response = await fetch('http://localhost:5000/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': password
        },
        body: JSON.stringify(blogForm)
      });

      const data = await response.json();
      if (data.success) {
        setStatus("✅ Insight system broadcast successfully!");
        setBlogForm({ title: '', category: '', excerpt: '' }); // Flush form values
      } else {
        setStatus(`❌ Broadcast failed: ${data.message}`);
      }
    } catch (err) {
      setStatus("Error connecting to database stream.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-swiss-dark flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-swiss-navy p-10 rounded-[2rem] border border-white/5 text-center shadow-2xl">
          <img src="/logo.png" alt="Tofina" className="h-16 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(1,195,141,0.3)]" />
          <h1 className="text-2xl font-black text-white mb-2 tracking-tight">Tofina Control Core</h1>
          <p className="text-xs font-mono text-swiss-green uppercase tracking-widest mb-8">Authorization Required</p>
          <input 
            type="password" 
            placeholder="Enter Admin Passphrase"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 mb-6 bg-swiss-dark border border-white/10 rounded-xl text-white text-center font-mono focus:border-swiss-green outline-none transition-all placeholder:text-swiss-grey/30"
          />
          <button type="submit" className="w-full py-4 bg-swiss-green text-swiss-dark font-black rounded-xl uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(1,195,141,0.2)]">
            Initialize Core
          </button>
          {status && <p className="mt-4 text-sm font-mono text-red-400">{status}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-swiss-dark text-white p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center border-b border-white/5 pb-6 mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tight">System Terminal</h1>
            <p className="text-xs font-mono text-swiss-green uppercase tracking-widest mt-1">Operational Mode / Admin Engine</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 border border-white/10 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-white/5 transition-all text-swiss-grey">
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          
          {/* Card 1: Left column - Smaller Asset Modifier */}
          <div className="bg-swiss-navy p-8 rounded-3xl border border-white/5 shadow-xl md:col-span-2">
            <span className="text-[10px] font-mono tracking-widest text-swiss-green uppercase block mb-2">[ Control 01 ]</span>
            <h3 className="text-xl font-bold mb-3">Identity Asset</h3>
            <p className="text-swiss-grey text-xs leading-relaxed mb-6">Stream a fresh photo format instantly overwriting the public facing landing image container seamlessly.</p>
            
            <label className="block w-full text-center py-4 bg-white/5 border border-white/10 rounded-xl font-bold uppercase tracking-widest text-xs cursor-pointer hover:bg-white/10 hover:border-swiss-green/30 transition-all">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {uploading ? "Streaming..." : "Choose System File"}
            </label>
          </div>

          {/* Card 2: Right Column - Large Form System For Insights */}
          <div className="bg-swiss-navy p-8 rounded-3xl border border-white/5 shadow-xl md:col-span-3">
            <span className="text-[10px] font-mono tracking-widest text-swiss-green uppercase block mb-2">[ Control 02 ]</span>
            <h3 className="text-xl font-bold mb-6">Insights / Blog Publisher</h3>
            
            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono tracking-widest uppercase text-swiss-grey block mb-2">Insight Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Scaling Django Signals Effortlessly"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full p-4 bg-swiss-dark border border-white/5 focus:border-swiss-green text-sm text-white rounded-xl outline-none transition-all placeholder:text-swiss-grey/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono tracking-widest uppercase text-swiss-grey block mb-2">Category Segment</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Full-Stack Automation, AWS, React"
                  value={blogForm.category}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  className="w-full p-4 bg-swiss-dark border border-white/5 focus:border-swiss-green text-sm text-white rounded-xl outline-none transition-all placeholder:text-swiss-grey/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono tracking-widest uppercase text-swiss-grey block mb-2">Content Excerpt</label>
                <textarea 
                  rows="4"
                  required
                  placeholder="Summarize your engineering breakthrough or technical deployment strategy here..."
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full p-4 bg-swiss-dark border border-white/5 focus:border-swiss-green text-sm text-white rounded-xl outline-none transition-all placeholder:text-swiss-grey/30 resize-none"
                ></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-swiss-green text-swiss-dark font-black rounded-xl uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-lg">
                Broadcast Node
              </button>
            </form>
          </div>

        </div>

        {status && (
          <div className="mt-8 p-4 bg-swiss-navy rounded-xl border border-swiss-green/20 font-mono text-xs text-swiss-green tracking-wide animate-pulse">
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;