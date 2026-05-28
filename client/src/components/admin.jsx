import React, { useState, useEffect } from 'react';

const AdminGateway = ({ onClose }) => {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Admin Panel Theme State (Default: True Dark Cyber Mode)
  const [isAdminDarkMode, setIsAdminDarkMode] = useState(true);

  // Form Field States - Custom UI Labels Linked to Local State Nodes
  const [projectData, setProjectData] = useState({ 
    title: '', 
    description: '', 
    technologies: '', 
    launchLiveApp: '', 
    viewCodeBase: '' 
  });
  const [projectFile, setProjectFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  // Dynamic Workspace Lists for Deletions
  const [activeProjectsList, setActiveProjectsList] = useState([]);
  const [activeBlogsList, setActiveBlogsList] = useState([]);

  // Fetch data records directly from the JSON files via backend API
  const fetchActiveWorkspaceData = async () => {
    try {
      const projRes = await fetch('http://localhost:5000/api/projects');
      const blogRes = await fetch('http://localhost:5000/api/blog');
      if (projRes.ok) {
        const pData = await projRes.json();
        setActiveProjectsList(pData);
      }
      if (blogRes.ok) {
        const bData = await blogRes.json();
        setActiveBlogsList(bData);
      }
    } catch (err) {
      console.error("Failed fetching workspace sync points.", err);
    }
  };

  // Automatically trigger sync when admin gains access
  useEffect(() => {
    if (isAuthenticated) {
      fetchActiveWorkspaceData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (secretKey.trim() !== '') {
      setIsAuthenticated(true);
      setStatusMessage({ text: 'Access Authorized. Workspace records synced.', isError: false });
    } else {
      setStatusMessage({ text: 'Invalid Master Secret Key Token.', isError: true });
    }
  };

  // Handle Item Deletions (Projects or Blog Insights)
  const handleItemDelete = async (targetId, endpointPath) => {
    if (!window.confirm("⚠️ Confirm complete deletion of this entry record from cloud and database file systems?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/${endpointPath}/${targetId}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Auth': secretKey }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setStatusMessage({ text: 'Data node wiped successfully.', isError: false });
        if (endpointPath === 'projects') setActiveProjectsList(result.projects || []);
        if (endpointPath === 'blog') setActiveBlogsList(result.posts || []);
      } else {
        setStatusMessage({ text: result.message || 'Wipe request rejected by server rules.', isError: true });
      }
    } catch (err) {
      setStatusMessage({ text: 'Network failure communicating delete execution flags.', isError: true });
    }
  };

  // Form Submissions
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectFile) {
      setStatusMessage({ text: 'Please attach a project mockup image frame.', isError: true });
      return;
    }
    setIsSubmitting(true);
    setStatusMessage({ text: '', isError: false });

    const formData = new FormData();
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('technologies', projectData.technologies);
    
    // CRITICAL FIX: Map your branded state inputs directly to backend expected schema keys
    formData.append('liveLink', projectData.launchLiveApp);
    formData.append('githubLink', projectData.viewCodeBase);
    formData.append('image', projectFile);

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'X-Admin-Auth': secretKey },
        body: formData
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatusMessage({ text: 'Project successfully pushed live!', isError: false });
        setProjectData({ title: '', description: '', technologies: '', launchLiveApp: '', viewCodeBase: '' });
        setProjectFile(null);
        e.target.reset();
        fetchActiveWorkspaceData(); // Refresh the list view grid instantly
      } else {
        setStatusMessage({ text: data.message || 'Sync rejected.', isError: true });
      }
    } catch (err) {
      setStatusMessage({ text: 'Network connection failure to API backend.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCvSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      setStatusMessage({ text: 'Please attach a valid PDF resource file.', isError: true });
      return;
    }
    setIsSubmitting(true);
    setStatusMessage({ text: '', isError: false });

    const formData = new FormData();
    formData.append('cv', cvFile);

    try {
      const response = await fetch('http://localhost:5000/api/upload-cv', {
        method: 'POST',
        headers: { 'X-Admin-Auth': secretKey },
        body: formData
      });
      if (response.ok) {
        setStatusMessage({ text: 'Static CV binary resource overwritten successfully!', isError: false });
        setCvFile(null);
        e.target.reset();
      } else {
        setStatusMessage({ text: 'Authorization refused or storage route broken.', isError: true });
      }
    } catch (err) {
      setStatusMessage({ text: 'Network pipeline error while uploading PDF.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileFile) {
      setStatusMessage({ text: 'Please choose a fresh image file for your avatar.', isError: true });
      return;
    }
    setIsSubmitting(true);
    setStatusMessage({ text: '', isError: false });

    const formData = new FormData();
    formData.append('profileImage', profileFile);

    try {
      const response = await fetch('http://localhost:5000/api/upload-profile', {
        method: 'POST',
        headers: { 'X-Admin-Auth': secretKey },
        body: formData
      });
      if (response.ok) {
        setStatusMessage({ text: 'Main profile avatar display node synced live!', isError: false });
        setProfileFile(null);
        e.target.reset();
      } else {
        setStatusMessage({ text: 'Server file system blocked profile replacement.', isError: true });
      }
    } catch (err) {
      setStatusMessage({ text: 'Network pipeline error while pushing image binary.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999] overflow-y-auto flex items-center justify-center p-6 font-mono transition-colors duration-300">
      
      <div className={`w-full max-w-4xl rounded-[2.5rem] border-4 p-10 relative my-8 transition-colors duration-300 ${
        isAdminDarkMode 
          ? 'bg-[#121214] border-white text-white shadow-[12px_12px_0px_#0C6FBD]' 
          : 'bg-white border-black text-black shadow-[12px_12px_0px_#000]'
      }`}>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 bg-red-500 text-white font-black h-10 w-10 rounded-full border-3 border-current flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md"
        >
          ✕
        </button>

        <div className={`border-b-4 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 ${
          isAdminDarkMode ? 'border-white/20' : 'border-black'
        }`}>
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">System Admin Console</h2>
            <p className={`text-xs font-bold mt-1 ${isAdminDarkMode ? 'text-gray-400' : 'text-black/50'}`}>
              OPERATOR PANEL v1.2.0 // CONTROL CORE
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminDarkMode(!isAdminDarkMode)}
              className={`flex items-center gap-2 font-black text-xs px-4 py-2 rounded-xl border-2 transition-all uppercase tracking-wider ${
                isAdminDarkMode 
                  ? 'bg-white text-black border-white' 
                  : 'bg-black text-white border-black'
              }`}
            >
              <span>{isAdminDarkMode ? '☀️ LIGHT_MODE' : '🌙 DARK_MODE'}</span>
            </button>

            {isAuthenticated && (
              <span className="bg-[#00E575] text-black px-3 py-2 border-2 border-current font-black text-[10px] rounded-xl uppercase tracking-wider animate-pulse">
                SYS_ACTIVE
              </span>
            )}
          </div>
        </div>

        {statusMessage.text && (
          <div className={`p-4 rounded-xl border-3 border-current font-black text-xs mb-8 uppercase tracking-wider ${
            statusMessage.isError ? 'bg-red-200 text-red-900' : 'bg-[#00E575] text-black'
          }`}>
            🤖 Pipeline Core Notice: {statusMessage.text}
          </div>
        )}

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-5 py-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest opacity-80">Input Master Access Key Token</label>
              <input 
                type="password" 
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="••••••••••••••••"
                className={`w-full p-4 border-3 rounded-xl font-bold focus:outline-none text-base ${
                  isAdminDarkMode ? 'bg-white/5 border-white text-white' : 'bg-gray-100 border-black text-black'
                }`}
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-[#00E575] text-black font-black rounded-xl border-3 border-current shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all uppercase tracking-widest text-sm"
            >
              Unlock Workspace
            </button>
          </form>
        ) : (
          <div>
            {/* WORKSPACE OPERATIONS INTERFACES GRID */}
            <div className="grid md:grid-cols-2 gap-10 items-start">
              
              <div className="space-y-8">
                <div className={`border-3 rounded-[1.8rem] p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.15)] space-y-4 ${
                  isAdminDarkMode ? 'bg-white/5 border-white/20' : 'bg-gray-50 border-black'
                }`}>
                  <h3 className="text-sm font-black bg-[#00E575] text-black px-3 py-1 border-2 border-black w-fit rounded-lg uppercase tracking-wider">
                    Publish New Project
                  </h3>
                  
                  <form onSubmit={handleProjectSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-black uppercase text-[9px]">Project Name</label>
                        <input 
                          type="text" required
                          value={projectData.title}
                          onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                          placeholder="e.g., Sanaa-Sync Hub"
                          className={`p-3 border-2 rounded-lg font-bold focus:outline-none ${
                            isAdminDarkMode ? 'bg-[#121214] border-white/20 text-white' : 'bg-white border-black text-black'
                          }`}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-black uppercase text-[9px]">Frameworks</label>
                        <input 
                          type="text" required
                          value={projectData.technologies}
                          onChange={(e) => setProjectData({...projectData, technologies: e.target.value})}
                          placeholder="React, Django, MariaDB"
                          className={`p-3 border-2 rounded-lg font-bold focus:outline-none ${
                            isAdminDarkMode ? 'bg-[#121214] border-white/20 text-white' : 'bg-white border-black text-black'
                          }`}
                        />
                      </div>
                    </div>

                    {/* NATIVE FORM ROWS: Launch Live App & View Code Base Inline Inputs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-black uppercase text-[9px]">⚡ Launch Live App</label>
                        <input 
                          type="url"
                          value={projectData.launchLiveApp}
                          onChange={(e) => setProjectData({...projectData, launchLiveApp: e.target.value})}
                          placeholder="https://your-live-app-link.com"
                          className={`p-3 border-2 rounded-lg font-bold focus:outline-none text-[11px] ${
                            isAdminDarkMode ? 'bg-[#121214] border-white/20 text-white' : 'bg-white border-black text-black'
                          }`}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-black uppercase text-[9px]">📂 View Code Base</label>
                        <input 
                          type="url"
                          value={projectData.viewCodeBase}
                          onChange={(e) => setProjectData({...projectData, viewCodeBase: e.target.value})}
                          placeholder="https://github.com/your-repo"
                          className={`p-3 border-2 rounded-lg font-bold focus:outline-none text-[11px] ${
                            isAdminDarkMode ? 'bg-[#121214] border-white/20 text-white' : 'bg-white border-black text-black'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-black uppercase text-[9px]">Architecture Details</label>
                      <textarea 
                        required rows="3"
                        value={projectData.description}
                        onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                        placeholder="Summary of tech stack modules..."
                        className={`p-3 border-2 rounded-lg font-bold focus:outline-none resize-none ${
                          isAdminDarkMode ? 'bg-[#121214] border-white/20 text-white' : 'bg-white border-black text-black'
                        }`}
                      ></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-black uppercase text-[9px]">Display Screenshot Image</label>
                      <input 
                        type="file" required accept="image/*"
                        onChange={(e) => setProjectFile(e.target.files[0])}
                        className={`p-2 w-full border-2 border-dashed rounded-lg cursor-pointer font-bold ${
                          isAdminDarkMode ? 'border-white/20 bg-[#121214] text-white/50' : 'border-black/40 bg-white text-black/60'
                        }`}
                      />
                    </div>

                    <button 
                      type="submit" disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#00E575] text-black font-black rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-px hover:translate-y-px transition-all uppercase tracking-widest"
                    >
                      {isSubmitting ? 'Syncing...' : 'Inject Project Entry'}
                    </button>
                  </form>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`border-3 rounded-[1.8rem] p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.15)] space-y-4 ${
                  isAdminDarkMode ? 'bg-white/5 border-white/20' : 'bg-yellow-50 border-black'
                }`}>
                  <h3 className="text-sm font-black bg-yellow-400 text-black px-3 py-1 border-2 border-black w-fit rounded-lg uppercase tracking-wider">
                    Profile Photo Sync
                  </h3>
                  
                  <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
                    <div className="flex flex-col gap-2">
                      <label className="font-black uppercase text-[9px]">Upload Fresh Avatar Square (PNG/JPG)</label>
                      <div className={`p-4 border-2 border-dashed rounded-xl text-center relative cursor-pointer ${
                        isAdminDarkMode ? 'border-white/20 bg-[#121214]' : 'border-black bg-white'
                      }`}>
                        <input 
                          type="file" required accept="image/*"
                          onChange={(e) => setProfileFile(e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="text-xl mb-1">📸</div>
                        <span className="font-black block truncate">
                          {profileFile ? profileFile.name : 'Select Avatar Image Node'}
                        </span>
                      </div>
                    </div>

                    <button 
                      type="submit" disabled={isSubmitting}
                      className={`w-full py-3 font-black rounded-xl border-2 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-px hover:translate-y-px transition-all uppercase tracking-widest text-[11px] ${
                        isAdminDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                      }`}
                    >
                      {isSubmitting ? 'Overwriting...' : 'Update Main Display Photo'}
                    </button>
                  </form>
                </div>

                <div className={`border-3 rounded-[1.8rem] p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.15)] space-y-4 ${
                  isAdminDarkMode ? 'bg-white/5 border-white/20' : 'bg-blue-50 border-black'
                }`}>
                  <h3 className="text-sm font-black bg-blue-400 text-white px-3 py-1 border-2 border-black w-fit rounded-lg uppercase tracking-wider">
                    Dynamic CV Sync
                  </h3>
                  
                  <form onSubmit={handleCvSubmit} className="space-y-4 text-xs">
                    <div className="flex flex-col gap-2">
                      <label className="font-black uppercase text-[9px]">Upload Updated CV Document Node (PDF)</label>
                      <div className={`p-4 border-2 border-dashed rounded-xl text-center relative cursor-pointer ${
                        isAdminDarkMode ? 'border-white/20 bg-[#121214]' : 'border-black bg-white'
                      }`}>
                        <input 
                          type="file" required accept=".pdf"
                          onChange={(e) => setCvFile(e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="text-xl mb-1">📄</div>
                        <span className="font-black block truncate">
                          {cvFile ? cvFile.name : 'Drop fresh CV PDF node'}
                        </span>
                      </div>
                    </div>

                    <button 
                      type="submit" disabled={isSubmitting}
                      className="w-full py-3 bg-[#00E575] text-black font-black rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-px hover:translate-y-px transition-all uppercase tracking-widest text-[11px]"
                    >
                      {isSubmitting ? 'Replacing Data...' : 'Over-Write Static CV File'}
                    </button>
                  </form>
                </div>
              </div>

            </div>

            {/* LIVE MANAGEMENT CATALOG BLOCK FOR WIPING ENTRIES */}
            <div className={`mt-12 pt-8 border-t-4 ${isAdminDarkMode ? 'border-white/20' : 'border-black'}`}>
              <h3 className="text-xl font-black uppercase tracking-tight mb-6">Active Workspace Data Records</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Projects Deletion List Wrapper */}
                <div className={`p-5 border-3 rounded-[1.8rem] ${isAdminDarkMode ? 'bg-white/5 border-white/20' : 'bg-gray-50 border-black'}`}>
                  <h4 className="text-xs font-black uppercase mb-4 text-[#00E575]">Live Project Index ({activeProjectsList.length})</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {activeProjectsList.length === 0 ? (
                      <p className="text-[10px] italic opacity-50 text-left">No deployed projects indexed.</p>
                    ) : activeProjectsList.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-current gap-2">
                        <div className="truncate text-left">
                          <p className="font-black text-xs truncate text-left">{item.title}</p>
                          <p className="text-[9px] opacity-60 truncate text-left">{item.tags?.join(', ') || 'No tech tags'}</p>
                        </div>
                        <button 
                          onClick={() => handleItemDelete(item.id, 'projects')}
                          className="bg-red-500 text-white font-black px-3 py-1 text-[10px] rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-px hover:translate-y-px active:shadow-none transition-all uppercase shrink-0"
                        >
                          Wipe
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insights Deletion List Wrapper */}
                <div className={`p-5 border-3 rounded-[1.8rem] ${isAdminDarkMode ? 'bg-white/5 border-white/20' : 'bg-gray-50 border-black'}`}>
                  <h4 className="text-xs font-black uppercase mb-4 text-yellow-400">Published Insights Catalog ({activeBlogsList.length})</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {activeBlogsList.length === 0 ? (
                      <p className="text-[10px] italic opacity-50 text-left">No insight documents written.</p>
                    ) : activeBlogsList.map(post => (
                      <div key={post.id} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-current gap-2">
                        <div className="truncate text-left">
                          <p className="font-black text-xs truncate text-left">{post.title}</p>
                          <p className="text-[9px] opacity-60 italic text-left">{post.date || 'No date specified'}</p>
                        </div>
                        <button 
                          onClick={() => handleItemDelete(post.id, 'blog')}
                          className="bg-red-500 text-white font-black px-3 py-1 text-[10px] rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-px hover:translate-y-px active:shadow-none transition-all uppercase shrink-0"
                        >
                          Wipe
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGateway;