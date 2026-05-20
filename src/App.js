import React, { useState, useRef, useEffect } from 'react';
import Timeline from './components/Timeline';
import Toolbar from './components/Toolbar';
import { Plus, Settings, Play, Pause, User, LayoutGrid, Scissors, ChevronLeft, Volume2, Speedometer, Sparkles } from 'lucide-react';

const HomeScreen = ({ onVideoUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      onVideoUpload({
        id: Date.now(),
        url: videoUrl,
        name: file.name,
        duration: 0,
        startTime: 0,
        endTime: 0,
        speed: 1.0,
        volume: 1.0,
        filter: 'none'
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#131313] p-4 text-white">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">CapCut Clone</h1>
        <Settings size={24} className="text-[#cac3d8]" />
      </header>

      <input type="file" accept="video/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

      <button
        onClick={() => fileInputRef.current.click()}
        className="w-full bg-[#7c4dff] h-48 rounded-xl flex flex-col items-center justify-center gap-2 mb-8 hover:brightness-110 active:scale-95 transition-all"
      >
        <div className="bg-white/20 p-4 rounded-full"><Plus size={32} /></div>
        <span className="font-bold text-lg">New Project</span>
      </button>

      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
        <div className="grid grid-cols-2 gap-4 opacity-50">
          <div className="aspect-video bg-[#2a2a2a] rounded-lg flex items-center justify-center"><Play size={20} /></div>
          <div className="aspect-video bg-[#2a2a2a] rounded-lg flex items-center justify-center"><Play size={20} /></div>
        </div>
      </div>

      <nav className="flex justify-around items-center h-20 border-t border-[#2c2c2c] -mx-4 px-4 bg-[#201f1f]">
        <button className="flex flex-col items-center gap-1 text-[#7c4dff]"><Scissors size={20} /><span className="text-[10px]">Edit</span></button>
        <button className="flex flex-col items-center gap-1 text-[#cac3d8]"><LayoutGrid size={20} /><span className="text-[10px]">Templates</span></button>
        <button className="flex flex-col items-center gap-1 text-[#cac3d8]"><User size={20} /><span className="text-[10px]">Me</span></button>
      </nav>
    </div>
  );
};

const EditorScreen = ({ initialClip, onBack }) => {
  const [clips, setClips] = useState([initialClip]);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const videoRef = useRef(null);

  const activeClip = clips[activeClipIndex];

  useEffect(() => {
    if (videoRef.current) {
       videoRef.current.playbackRate = activeClip.speed;
       videoRef.current.volume = activeClip.volume;
    }
  }, [activeClip.speed, activeClip.volume]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSplit = () => {
    const time = videoRef.current.currentTime;
    const newClips = [...clips];
    const originalClip = newClips[activeClipIndex];

    // In a real app, we'd handle the logic of splitting the underlying media.
    // Here we'll simulate by creating two clip references with different start/end bounds.
    const clip2 = { ...originalClip, id: Date.now(), startTime: time };
    originalClip.endTime = time;

    newClips.splice(activeClipIndex + 1, 0, clip2);
    setClips(newClips);
  };

  const updateActiveClip = (props) => {
    const newClips = [...clips];
    newClips[activeClipIndex] = { ...newClips[activeClipIndex], ...props };
    setClips(newClips);
  };

  const getFilterStyle = (filter) => {
    switch(filter) {
      case 'grayscale': return 'grayscale(1)';
      case 'sepia': return 'sepia(1)';
      case 'invert': return 'invert(1)';
      case 'blur': return 'blur(2px)';
      default: return 'none';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#131313] text-white overflow-hidden">
      <header className="flex items-center justify-between p-4 border-b border-[#2c2c2c]">
        <button onClick={onBack}><ChevronLeft size={24} /></button>
        <span className="text-xs font-bold text-primary tracking-widest">EDITOR</span>
        <button className="bg-[#7c4dff] px-4 py-1 rounded-full text-xs font-bold">EXPORT</button>
      </header>

      <main className="flex-1 bg-black flex flex-col items-center justify-center relative group">
        <video
          ref={videoRef}
          src={activeClip.url}
          className="max-h-full w-auto transition-all"
          style={{ filter: getFilterStyle(activeClip.filter) }}
          onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
          onLoadedMetadata={() => updateActiveClip({ duration: videoRef.current.duration, endTime: videoRef.current.duration })}
        />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
           <button onClick={togglePlay}>{isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}</button>
           <span className="text-sm font-mono">{currentTime.toFixed(2)} / {activeClip.duration.toFixed(2)}</span>
        </div>

        {/* Speed Menu Overlay */}
        {showSpeedMenu && (
          <div className="absolute inset-x-0 bottom-0 bg-[#1a1a19] p-6 border-t border-[#2c2c2c] animate-in slide-in-from-bottom">
            <h3 className="text-sm font-bold mb-4">Playback Speed</h3>
            <div className="flex justify-around">
              {[0.5, 1.0, 1.5, 2.0].map(s => (
                <button
                  key={s}
                  onClick={() => { updateActiveClip({ speed: s }); setShowSpeedMenu(false); }}
                  className={`px-4 py-2 rounded-full text-xs ${activeClip.speed === s ? 'bg-primary' : 'bg-[#2a2a2a]'}`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters Menu Overlay */}
        {showFilters && (
          <div className="absolute inset-x-0 bottom-0 bg-[#1a1a19] p-6 border-t border-[#2c2c2c] animate-in slide-in-from-bottom">
            <h3 className="text-sm font-bold mb-4">Filters</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {['none', 'grayscale', 'sepia', 'invert', 'blur'].map(f => (
                <button
                  key={f}
                  onClick={() => { updateActiveClip({ filter: f }); setShowFilters(false); }}
                  className={`flex-shrink-0 w-16 h-16 rounded-md flex items-center justify-center text-[10px] capitalize ${activeClip.filter === f ? 'border-2 border-primary' : 'bg-[#2a2a2a]'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <Timeline clips={clips} activeIndex={activeClipIndex} onSelectClip={setActiveClipIndex} />

      <div className="bg-[#201f1f] h-20 flex items-center px-4 gap-6 overflow-x-auto border-t border-[#2c2c2c]">
        <button onClick={handleSplit} className="flex flex-col items-center gap-1 min-w-[50px] text-[#cac3d8] hover:text-primary transition-colors">
          <Scissors size={20} /><span class="text-[10px]">Split</span>
        </button>
        <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="flex flex-col items-center gap-1 min-w-[50px] text-[#cac3d8] hover:text-primary transition-colors">
          <Volume2 size={20} /><span class="text-[10px]">Speed</span>
        </button>
        <button onClick={() => setShowFilters(!showFilters)} className="flex flex-col items-center gap-1 min-w-[50px] text-[#cac3d8] hover:text-primary transition-colors">
          <Sparkles size={20} /><span class="text-[10px]">Filters</span>
        </button>
        <Toolbar minimal />
      </div>
    </div>
  );
};

function App() {
  const [view, setView] = useState('home');
  const [initialClip, setInitialClip] = useState(null);

  const handleVideoUpload = (clip) => {
    setInitialClip(clip);
    setView('editor');
  };

  return (
    <div className="App font-sans antialiased">
      {view === 'home' ? (
        <HomeScreen onVideoUpload={handleVideoUpload} />
      ) : (
        <EditorScreen initialClip={initialClip} onBack={() => setView('home')} />
      )}
    </div>
  );
}

export default App;
