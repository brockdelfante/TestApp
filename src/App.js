import React, { useState, useRef } from 'react';
import Timeline from './components/Timeline';
import Toolbar from './components/Toolbar';
import { Plus, Settings, Play, Pause, User, LayoutGrid, Scissors, ChevronLeft, Share2 } from 'lucide-react';

const HomeScreen = ({ onVideoUpload }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      onVideoUpload(videoUrl);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#131313] p-4 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">CapCut Clone</h1>
        <Settings size={24} className="text-[#cac3d8]" />
      </div>

      <input
        type="file"
        accept="video/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <button
        onClick={handleUploadClick}
        className="w-full bg-[#7c4dff] h-48 rounded-xl flex flex-col items-center justify-center gap-2 mb-8 active:scale-95 transition-transform"
      >
        <div className="bg-white/20 p-4 rounded-full">
          <Plus size={32} />
        </div>
        <span className="font-bold text-lg">New Project</span>
      </button>

      <div className="flex-1 overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <span className="text-xs text-[#7c4dff]">View All</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map(i => (
            <div key={i} className="flex flex-col gap-2 group">
              <div className="aspect-video bg-[#2a2a2a] rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <Play size={20} className="text-white/60 relative z-10" />
                <span className="absolute bottom-1 right-1 text-[10px] bg-black/60 px-1 rounded">0:15</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">My Awesome Edit {i}</span>
                <span className="text-[10px] text-[#cac3d8]">Today • 2.4 MB</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-around items-center h-20 border-t border-[#2c2c2c] -mx-4 px-4 bg-[#201f1f]">
        <button className="flex flex-col items-center gap-1 text-[#7c4dff]">
          <Scissors size={20} />
          <span className="text-[10px]">Edit</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#cac3d8]">
          <LayoutGrid size={20} />
          <span className="text-[10px]">Templates</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#cac3d8]">
          <User size={20} />
          <span className="text-[10px]">Me</span>
        </button>
      </div>
    </div>
  );
};

const EditorScreen = ({ videoUrl, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    const ms = Math.floor((time % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-screen bg-[#131313] text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-[#2c2c2c] bg-[#131313] z-50">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">Project Name</h1>
          <span className="text-[10px] text-primary">1080P • 30fps</span>
        </div>
        <button className="bg-[#7c4dff] px-5 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95">
          EXPORT
        </button>
      </header>

      {/* Video Preview */}
      <main className="flex-1 bg-black flex flex-col items-center justify-center relative group">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="max-h-full w-auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
          />
        ) : (
          <div className="aspect-video w-full max-w-2xl bg-[#1c1b1b] flex items-center justify-center">
            <span className="text-[#cac3d8]">No video selected</span>
          </div>
        )}

        {/* Floating Play Control */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
           <button onClick={togglePlay} className="hover:text-primary transition-colors">
             {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
           </button>
           <div className="h-4 w-px bg-white/20" />
           <span className="text-sm font-mono tracking-tighter w-24">
             {formatTime(currentTime)}
           </span>
        </div>
      </main>

      {/* Timeline & Controls */}
      <Timeline />
      <Toolbar />
    </div>
  );
};

function App() {
  const [view, setView] = useState('home');
  const [videoUrl, setVideoUrl] = useState(null);

  const handleVideoUpload = (url) => {
    setVideoUrl(url);
    setView('editor');
  };

  return (
    <div className="App font-sans antialiased">
      {view === 'home' ? (
        <HomeScreen onVideoUpload={handleVideoUpload} />
      ) : (
        <EditorScreen videoUrl={videoUrl} onBack={() => setView('home')} />
      )}
    </div>
  );
}

export default App;
