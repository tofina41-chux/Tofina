import React, { useState } from 'react';

const AdminGateway = ({ onClose }) => {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 🌓 Admin Panel Theme State (Default: True Dark Cyber Mode)
  const [isAdminDarkMode, setIsAdminDarkMode] = useState(true);

  // Form Field States
  const [projectData, setProjectData] = useState({ title: '', description: '', technologies: '' });
  const [projectFile, setProjectFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (secretKey.trim() !== '') {
      setIsAuthenticated(true);
      setStatusMessage({ text: 'Access Authorized. System interface unlocked.', isError: false });
    } else {
      setStatusMessage({ text: 'Invalid Master Secret Key Token.', isError: true });
    }
  };

  // 1. Project Form Handler
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
    formData.append('image', projectFile);

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'X-Admin-Auth': secretKey },
        body: formData
      });
      if (response.ok) {
        setStatusMessage({ text: 'Project successfully pushed into the core terminal loop!', isError: false });
        setProjectData({ title: '', description: '', technologies: '' });
        setProjectFile(null);
        e.target.reset();
      } else {
        setStatusMessage({ text: 'Database sync rejected by API supervisor.', isError: true });
      }
    } catch (err) {
      setStatusMessage({ text: 'Network connection failure to API backend.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Static CV Form Handler
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

  // 3. Profile Photo Sync Form Handler
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
      
      {/* MASTER PANEL WRAPPER - Dynamic standard light or tech dark container classes */}
      <div className={`w-full max-w-4xl rounded-[2.5rem] border-4 p-10 relative my-8 transition-colors duration-300 ${
        isAdminDarkMode 
          ? 'bg-swiss-dark border-white text-white shadow-[12px_12px_0px_#0C6FBD]' 
          : 'bg-white border-swiss-dark text-swiss-dark shadow-[12px_12px_0px_#000]'
      }`}>
        
        {/* ESCAPE WINDOW CLOSER BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 bg-red-500 text-white font-black h-10 w-10 rounded-full border-3 border-current flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md"
        >
          ✕
        </button>

        {/* MASTER HEADER NODE */}
        <div className={`border-b-4 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 ${
          isAdminDarkMode ? 'border-white/20' : 'border-swiss-dark'
        }`}>
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">System Admin Console</h2>
            <p className={`text-xs font-bold mt-1 ${isAdminDarkMode ? 'text-swiss-grey' : 'text-swiss-dark/50'}`}>
              OPERATOR PANEL v1.2.0 // CONTROL CORE
            </p>
          </div>

          {/* THEME SWITCH TOGGLE NODE & BACKEND PIPELINE TAG */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminDarkMode(!isAdminDarkMode)}
              className={`flex items-center gap-2 font-black text-xs px-4 py-2 rounded-xl border-2 transition-all uppercase tracking-wider ${
                isAdminDarkMode 
                  ? 'bg-white text-swiss-dark border-white shadow-[3px_3px_0px_rgba(255,255,255,0.2)]' 
                  : 'bg-swiss-dark text-white border-swiss-dark shadow-[3px_3px_0px_rgba(0,0,0,0.2)]'
              }`}
            >
              <span>{isAdminDarkMode ? '☀️ LIGHT_MODE' : '🌙 DARK_MODE'}</span>
            </button>

            {isAuthenticated && (
              <span className="bg-swiss-green text-swiss-dark px-3 py-2 border-2 border-current font-black text-[10px] rounded-xl uppercase tracking-wider animate-pulse">
                SYS_ACTIVE
              </span>
            )}
          </div>
        </div>

        {/* TOAST SYSTEM ALERTS BANNER */}
        {statusMessage.text && (
          <div className={`p-4 rounded-xl border-3 border-current font-black text-xs mb-8 uppercase tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,0.15)] ${
            statusMessage.isError ? 'bg-red-200 text-red-900' : 'bg-swiss-green text-swiss-dark'
          }`}>
            🤖 Pipeline Core Notice: {statusMessage.text}
          </div>
        )}

        {/* PHASE A: SIGN-IN LOCK SCREEN */}
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
                  isAdminDarkMode ? 'bg-white/5 border-white text-white' : 'bg-swiss-grey/10 border-swiss-dark text-swiss-dark'
                }`}
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-swiss-green text-swiss-dark font-black rounded-xl border-3 border-current shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all uppercase tracking-widest text-sm"
            >
              Unlock Workspace
            </button>
          </form>
        ) : (
          
          /* PHASE B: NEUBRUTALISM DUAL COMPARTMENT WORKSPACE PANELS */
          <div className="grid md:grid-cols-2 gap-10 items-start">
            
            {/* LEFT COMPARTMENT COLUMNS */}
            <div className="space-y-8">
              
              {/* INTERFACE 1: DYNAMIC PROJECT DATA INJECTOR */}
              <div className={`border-3 rounded-[1.8rem] p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.15)] space-y-4 ${
                isAdminDarkMode ? 'bg-white/5 border-white/20' : 'bg-swiss-grey/5 border-swiss-dark'
              }`}>
                <h3 className="text-sm font-black bg-swiss-green text-swiss-dark px-3 py-1 border-2 border-swiss-dark w-fit rounded-lg shadow-[2px_2px_0px_#000] uppercase tracking-wider">
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
                          isAdminDarkMode ? 'bg-swiss-dark border-white/20 text-white' : 'bg-white border-swiss-dark text-swiss-dark'
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
                          isAdminDarkMode ? 'bg-swiss-dark border-white/20 text-white' : 'bg-white border-swiss-dark text-swiss-dark'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-black uppercase text-[9px]">System Architecture Details</label>
                    <textarea 
                      required rows="3"
                      value={projectData.description}
                      onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                      placeholder="Summary of tech stack modules..."
                      className={`p-3 border-2 rounded-lg font-bold focus:outline-none resize-none ${
                        isAdminDarkMode ? 'bg-swiss-dark border-white/20 text-white' : 'bg-white border-swiss-dark text-swiss-dark'
                      }`}
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-black uppercase text-[9px]">Display Screenshot Image</label>
                    <input 
                      type="file" required accept="image/*"
                      onChange={(e) => setProjectFile(e.target.files[0])}
                      className={`p-2 w-full border-2 border-dashed rounded-lg cursor-pointer font-bold file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-swiss-dark file:text-white file:font-black file:uppercase ${
                        isAdminDarkMode ? 'border-white/20 bg-swiss-dark text-white/50' : 'border-swiss-dark/40 bg-white text-swiss-dark/60'
                      }`}
                    />
                  </div>

                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full py-3.5 bg-swiss-green text-swiss-dark font-black rounded-xl border-2 border-swiss-dark shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-px hover:translate-y-px transition-all uppercase tracking-widest"
                  >
                    {isSubmitting ? 'Syncing...' : 'Inject Project Entry'}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT COMPARTMENT COLUMNS */}
            <div className="space-y-8">
              
              {/* INTERFACE 2: DYNAMIC BIOGRAPHY AVATAR PHOTO FLIPPER */}
              <div className={`border-3 rounded-[1.8rem] p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.15)] space-y-4 ${
                isAdminDarkMode ? 'bg-white/5 border-white/20' : 'bg-yellow-50 border-swiss-dark'
              }`}>
                <h3 className="text-sm font-black bg-yellow-400 text-swiss-dark px-3 py-1 border-2 border-swiss-dark w-fit rounded-lg shadow-[2px_2px_0px_#000] uppercase tracking-wider">
                  Profile Photo Sync
                </h3>
                
                <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
                  <div className="flex flex-col gap-2">
                    <label className="font-black uppercase text-[9px]">Upload Fresh Avatar Square (PNG/JPG)</label>
                    <div className={`p-4 border-2 border-dashed rounded-xl text-center relative cursor-pointer transition-all ${
                      isAdminDarkMode ? 'border-white/20 bg-swiss-dark' : 'border-swiss-dark bg-white'
                    }`}>
                      <input 
                        type="file" required accept="image/*"
                        onChange={(e) => setProfileFile(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-xl mb-1">📸</div>
                      <span className={`font-black block truncate ${isAdminDarkMode ? 'text-white' : 'text-swiss-dark'}`}>
                        {profileFile ? profileFile.name : 'Select Avatar Image Node'}
                      </span>
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={isSubmitting}
                    className={`w-full py-3 font-black rounded-xl border-2 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-px hover:translate-y-px transition-all uppercase tracking-widest text-[11px] ${
                      isAdminDarkMode ? 'bg-white text-swiss-dark border-white' : 'bg-swiss-dark text-white border-swiss-dark'
                    }`}
                  >
                    {isSubmitting ? 'Overwriting...' : 'Update Main Display Photo'}
                  </button>
                </form>
              </div>

              {/* INTERFACE 3: SYSTEM STATIC CV LINK PIPELINE */}
              <div className={`border-3 rounded-[1.8rem] p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.15)] space-y-4 ${
                isAdminDarkMode ? 'bg-white/5 border-white/20' : 'bg-blue-50 border-swiss-dark'
              }`}>
                <h3 className="text-sm font-black bg-blue-400 text-white px-3 py-1 border-2 border-swiss-dark w-fit rounded-lg shadow-[2px_2px_0px_#000] uppercase tracking-wider">
                  Dynamic CV Sync
                </h3>
                
                <form onSubmit={handleCvSubmit} className="space-y-4 text-xs">
                  <div className="flex flex-col gap-2">
                    <label className="font-black uppercase text-[9px]">Upload Updated CV Document Node (PDF)</label>
                    <div className={`p-4 border-2 border-dashed rounded-xl text-center relative cursor-pointer transition-all ${
                      isAdminDarkMode ? 'border-white/20 bg-swiss-dark' : 'border-swiss-dark bg-white'
                    }`}>
                      <input 
                        type="file" required accept=".pdf"
                        onChange={(e) => setCvFile(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-xl mb-1">📄</div>
                      <span className={`font-black block truncate ${isAdminDarkMode ? 'text-white' : 'text-swiss-dark'}`}>
                        {cvFile ? cvFile.name : 'Drop fresh CV PDF node'}
                      </span>
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full py-3 bg-swiss-green text-swiss-dark font-black rounded-xl border-2 border-swiss-dark shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-px hover:translate-y-px transition-all uppercase tracking-widest text-[11px]"
                  >
                    {isSubmitting ? 'Replacing Data...' : 'Over-Write Static CV File'}
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGateway;