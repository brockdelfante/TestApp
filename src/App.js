import React, { useState } from 'react';
import Timeline from './components/Timeline';
import Toolbar from './components/Toolbar';
import { Plus, Settings, PlayCircle, User, LayoutGrid, Scissors } from 'lucide-react';

const HomeScreen = ({ onStartProject }) => (
  <div className="flex flex-col h-screen bg-[#131313] p-4 text-white">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-xl font-bold">CapCut Clone</h1>
      <Settings size={24} />
    </div>

    <button
      onClick={onStartProject}
      className="w-full bg-[#7c4dff] h-48 rounded-xl flex flex-col items-center justify-center gap-2 mb-8 active:scale-95 transition-transform"
    >
      <div className="bg-white/20 p-4 rounded-full">
        <Plus size={32} />
      </div>
      <span className="font-bold">New Project</span>
    </button>

    <div className="flex-1 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex flex-col gap-2">
            <div className="aspect-video bg-[#2a2a2a] rounded-lg flex items-center justify-center">
              <PlayCircle className="text-white/40" />
            </div>
            <span className="text-sm">Sunset Vlog #{i}</span>
            <span className="text-xs text-[#cac3d8]">2024-05-20 • 0:15</span>
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

const EditorScreen = ({ onBack }) => (
  <div className="flex flex-col h-screen bg-[#131313] text-white overflow-hidden">
    <header className="flex items-center justify-between p-4 border-b border-[#2c2c2c]">
      <button onClick={onBack} className="text-sm">Cancel</button>
      <h1 className="text-md font-bold">New Project</h1>
      <button className="bg-[#7c4dff] px-4 py-1 rounded text-sm font-medium">Export</button>
    </header>

    <main className="flex-1 bg-black flex items-center justify-center">
      <div className="aspect-video w-full max-w-2xl bg-[#1c1b1b] flex items-center justify-center relative">
        <span className="text-[#cac3d8]">Video Preview</span>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 px-4 py-2 rounded-full">
           <PlayCircle size={24} />
           <span className="text-xs font-mono">00:00 / 00:15</span>
        </div>
      </div>
    </main>

    <Timeline />
    <Toolbar />
  </div>
);

function App() {
  const [view, setView] = useState('home');

  return (
    <div className="App">
      {view === 'home' ? (
        <HomeScreen onStartProject={() => setView('editor')} />
      ) : (
        <EditorScreen onBack={() => setView('home')} />
      )}
    </div>
  );
}

export default App;
