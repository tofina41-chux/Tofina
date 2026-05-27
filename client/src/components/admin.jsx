import React, { useState } from 'react';

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState("blog");
  const [loadingFile, setLoadingFile] = useState(false);

  // Form Hooks
  const [blogForm, setBlogForm] = useState({ title: '', category: '', excerpt: '' });
  const [blogFile, setBlogFile] = useState(null);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', tags: '', liveLink: '', githubLink: '' });
  const [projectFile, setProjectFile] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "YourSuperSecretPasswordHere") { // Match your server .env key
      setIsAuthenticated(true);
      setStatus("Access Granted. Systems Online.");
    } else {
      setStatus("Invalid Credentials.");
    }
  };

  const handleAssetUpload = async (file, endpointField, apiPath) => {
    if (!file) return;
    const formData = new FormData();
    formData.append(endpointField, file);
    setLoadingFile(true);
    setStatus("Streaming asset data packet to production architecture...");

    try {
      const response = await fetch(`http://localhost:5000/api/${apiPath}`, {
        method: 'POST',
        headers: { 'x-admin-auth': password },
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setStatus(`✅ System asset [${endpointField}] deployed successfully!`);
      } else {
        setStatus(`❌ Process Aborted: ${data.message}`);
      }
    } catch (err) {
      setStatus("Connection timed out uploading server core components.");
    } finally {
      setLoadingFile(false);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setStatus("Publishing dynamic media insight node...");
    const formData = new FormData();
    formData.append('title', blogForm.title);
    formData.append('category', blogForm.category);
    formData.append('excerpt', blogForm.excerpt);
    if (blogFile) formData.append('blogImage', blogFile);

    try {
      const response = await fetch('http://localhost:5000/api/blog', {
        method: 'POST',
        headers: { 'x-admin-auth': password },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus("✅ Insight broadcasted with media content successfully!");
        setBlogForm({ title: '', category: '', excerpt: '' });
        setBlogFile(null);
      }
    } catch (err) { setStatus("Error syncing insight node."); }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setStatus("Deploying architecture project to live showcase...");
    const formData = new FormData();
    formData.append('title', projectForm.title);
    formData.append('description', projectForm.description);
    formData.append('tags', projectForm.tags);
    formData.append('liveLink', projectForm.liveLink);
    formData.append('githubLink', projectForm.githubLink);
    if (projectFile) formData.append('projectImage', projectFile);

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'x-admin-auth': password },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus("✅ Project deployed to portfolio grid successfully!");
        setProjectForm({ title: '', description: '', tags: '', liveLink: '', githubLink: '' });
        setProjectFile(null);
      }
    } catch (err) { setStatus("Error syncing project data stream."); }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-swiss-dark flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-swiss-navy p-10 rounded-[2rem] border border-white/5 text-center shadow-2xl">
          <h1 className="text-2xl font-black text-white mb-2">Tofina Control Core</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 mb-6 bg-swiss-dark border border-white/10 rounded-xl text-white text-center font-mono focus:border-swiss-green outline-none" placeholder="Passphrase"/>
          <button type="submit" className="w-full py-4 bg-swiss-green text-swiss-dark font-black rounded-xl uppercase tracking-widest text-xs">Initialize</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-swiss-dark text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Tab Panel */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-b border-white/5 pb-6 mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">System Terminal</h1>
            <p className="text-xs font-mono text-swiss-green uppercase tracking-widest mt-1">Operational Mode / Admin Engine</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2 bg-swiss-navy p-1.5 rounded-2xl border border-white/5">
              <button onClick={() => setActiveTab("blog")} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${activeTab === 'blog' ? 'bg-swiss-green text-swiss-dark' : 'text-white/60'}`}>Insights</button>
              <button onClick={() => setActiveTab("projects")} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${activeTab === 'projects' ? 'bg-swiss-green text-swiss-dark' : 'text-white/60'}`}>Projects</button>
              <button onClick={() => setActiveTab("profile")} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${activeTab === 'profile' ? 'bg-swiss-green text-swiss-dark' : 'text-white/60'}`}>Avatar</button>
              <button onClick={() => setActiveTab("cv")} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${activeTab === 'cv' ? 'bg-swiss-green text-swiss-dark' : 'text-white/60'}`}>CV / Resume</button>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="px-4 py-3 border border-white/10 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-white/5 transition-all text-swiss-grey">Logout</button>
          </div>
        </div>

        {/* TAB RENDERING CONNECTIONS */}
        {activeTab === "blog" && (
          <form onSubmit={handleBlogSubmit} className="bg-swiss-navy p-8 rounded-3xl border border-white/5 space-y-4 shadow-xl">
            <h3 className="text-xl font-black text-swiss-green mb-6">// PUBLISH RICH INSIGHT</h3>
            <input type="text" placeholder="Insight Title" required value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} className="w-full p-4 bg-swiss-dark border border-white/5 rounded-xl text-sm outline-none text-white focus:border-swiss-green"/>
            <input type="text" placeholder="Category (e.g., AWS, React)" required value={blogForm.category} onChange={(e) => setBlogForm({...blogForm, category: e.target.value})} className="w-full p-4 bg-swiss-dark border border-white/5 rounded-xl text-sm outline-none text-white focus:border-swiss-green"/>
            <textarea rows="6" placeholder="Rich paragraph breakdown or excerpt content..." required value={blogForm.excerpt} onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})} className="w-full p-4 bg-swiss-dark border border-white/5 rounded-xl text-sm outline-none text-white resize-none focus:border-swiss-green"></textarea>
            <div className="bg-swiss-dark p-4 rounded-xl border border-white/5 flex justify-between items-center">
              <span className="text-xs text-swiss-grey font-mono">Insight Banner Image:</span>
              <input type="file" accept="image/*" onChange={(e) => setBlogFile(e.target.files[0])} className="text-xs text-swiss-green" />
            </div>
            <button type="submit" className="w-full py-4 bg-swiss-green text-swiss-dark font-black rounded-xl uppercase text-xs tracking-widest shadow-lg">Broadcast Node</button>
          </form>
        )}

        {activeTab === "projects" && (
          <form onSubmit={handleProjectSubmit} className="bg-swiss-navy p-8 rounded-3xl border border-white/5 space-y-4 shadow-xl">
            <h3 className="text-xl font-black text-swiss-green mb-6">// DEPLOY LIVE PROJECT SHOWCASE</h3>
            <input type="text" placeholder="Project Title" required value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} className="w-full p-4 bg-swiss-dark border border-white/5 rounded-xl text-sm outline-none text-white focus:border-swiss-green"/>
            <input type="text" placeholder="Tags (separated by commas: React, Node, Django)" required value={projectForm.tags} onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})} className="w-full p-4 bg-swiss-dark border border-white/5 rounded-xl text-sm outline-none text-white focus:border-swiss-green"/>
            <input type="text" placeholder="Live Deploy URL" value={projectForm.liveLink} onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})} className="w-full p-4 bg-swiss-dark border border-white/5 rounded-xl text-sm outline-none text-white focus:border-swiss-green"/>
            <input type="text" placeholder="GitHub Code Repository Link" value={projectForm.githubLink} onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})} className="w-full p-4 bg-swiss-dark border border-white/5 rounded-xl text-sm outline-none text-white focus:border-swiss-green"/>
            <textarea rows="6" placeholder="Detailed architectural breakdown..." required value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} className="w-full p-4 bg-swiss-dark border border-white/5 rounded-xl text-sm outline-none text-white resize-none focus:border-swiss-green"></textarea>
            <div className="bg-swiss-dark p-4 rounded-xl border border-white/5 flex justify-between items-center">
              <span className="text-xs text-swiss-grey font-mono">Showcase Screenshot:</span>
              <input type="file" accept="image/*" onChange={(e) => setProjectFile(e.target.files[0])} className="text-xs text-swiss-green" />
            </div>
            <button type="submit" className="w-full py-4 bg-swiss-green text-swiss-dark font-black rounded-xl uppercase text-xs tracking-widest shadow-lg">Deploy Component</button>
          </form>
        )}

        {activeTab === "profile" && (
          <div className="bg-swiss-navy p-8 rounded-3xl border border-white/5 space-y-6 shadow-xl text-center">
            <h3 className="text-xl font-black text-swiss-green text-left">// UPDATE IDENTITY PROFILE AVATAR</h3>
            <p className="text-swiss-grey text-sm text-left leading-relaxed">Select a fresh picture file to instantly overwrite your public avatar container placeholder cleanly.</p>
            <div className="bg-swiss-dark p-8 rounded-2xl border border-dashed border-white/15 max-w-md mx-auto">
              <label className="px-6 py-4 bg-swiss-navy border border-white/10 hover:border-swiss-green/30 rounded-xl font-mono text-xs uppercase tracking-widest font-bold cursor-pointer transition-all inline-block">
                Choose Avatar File
                <input type="file" accept="image/*" onChange={(e) => handleAssetUpload(e.target.files[0], 'profileImage', 'upload-profile')} className="hidden" />
              </label>
            </div>
          </div>
        )}

        {activeTab === "cv" && (
          <div className="bg-swiss-navy p-8 rounded-3xl border border-white/5 space-y-6 shadow-xl text-center">
            <h3 className="text-xl font-black text-swiss-green text-left">// UPDATE INFRASTRUCTURE DOCUMENT ATTACHMENT (CV)</h3>
            <p className="text-swiss-grey text-sm text-left leading-relaxed">Stream a modern PDF layout directly into the server database root, enabling instant downloads across client side buttons.</p>
            <div className="bg-swiss-dark p-8 rounded-2xl border border-dashed border-white/15 max-w-md mx-auto">
              <label className="px-6 py-4 bg-swiss-navy border border-white/10 hover:border-swiss-green/30 rounded-xl font-mono text-xs uppercase tracking-widest font-bold cursor-pointer transition-all inline-block text-swiss-green">
                Select Resume PDF
                <input type="file" accept=".pdf" onChange={(e) => handleAssetUpload(e.target.files[0], 'resumeFile', 'upload-cv')} className="hidden" />
              </label>
            </div>
          </div>
        )}

        {status && <div className="mt-8 p-4 bg-swiss-navy rounded-xl border border-swiss-green/25 font-mono text-xs text-swiss-green text-center">{status}</div>}
      </div>
    </div>
  );
};

export default Admin;