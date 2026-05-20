import React from 'react';
import { Volume2, VolumeX, Maximize2 } from 'lucide-react';

const Timeline = () => {
  return (
    <div className="bg-[#1c1b1b] h-64 border-t border-[#2c2c2c] flex flex-col">
      {/* Timeline Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2c2c2c] bg-[#1a1a19]">
        <div className="flex items-center gap-4">
          <button className="text-[#cac3d8] hover:text-white transition-colors">
            <Volume2 size={16} />
          </button>
          <div className="h-3 w-px bg-[#2c2c2c]" />
          <span className="text-[10px] font-mono text-primary font-bold">00:00:00:00</span>
        </div>
        <div className="flex items-center gap-3">
           <span className="text-[10px] text-[#555] font-medium">1080P</span>
           <Maximize2 size={14} className="text-[#cac3d8]" />
        </div>
      </div>

      <div className="flex-1 relative overflow-x-auto overflow-y-hidden bg-[#131313] scrollbar-hide">
        {/* Playhead */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary z-40 shadow-[0_0_10px_rgba(124,77,255,0.5)]">
           <div className="w-4 h-2 bg-primary absolute -top-1 -left-[7px] rounded-sm" />
        </div>

        {/* Time Markers */}
        <div className="h-6 border-b border-[#2c2c2c] flex items-end px-2 gap-12 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-2 w-px bg-white" />
              <span className="text-[8px] mt-0.5">00:{i.toString().padStart(2, '0')}s</span>
            </div>
          ))}
        </div>

        {/* Tracks */}
        <div className="flex flex-col gap-2 p-2 min-w-[300%]">
          {/* Video Track */}
          <div className="h-14 bg-[#1e1e1e] rounded-md border border-[#2c2c2c] relative overflow-hidden flex items-center group">
             <div className="absolute left-1/2 w-48 h-full bg-[#353534] border-x-2 border-primary/40 flex items-center px-3 gap-1">
                <div className="w-12 h-8 bg-black/40 rounded-sm" />
                <div className="w-12 h-8 bg-black/40 rounded-sm" />
                <div className="w-12 h-8 bg-black/40 rounded-sm" />
             </div>
             <span className="text-[10px] text-white/40 ml-4 font-medium uppercase tracking-widest">Main Video</span>
          </div>

          {/* Audio Track */}
          <div className="h-10 bg-blue-900/10 rounded-md border border-blue-500/20 relative overflow-hidden flex items-center">
             <div className="absolute left-1/2 w-64 h-full bg-blue-500/20 border-x border-blue-400/40" />
             <span className="text-[10px] text-blue-400/40 ml-4 font-medium uppercase tracking-widest">Background Music</span>
          </div>

          {/* Text Track */}
          <div className="h-8 bg-yellow-900/10 rounded-md border border-yellow-500/20 relative overflow-hidden flex items-center">
             <div className="absolute left-[60%] w-24 h-full bg-yellow-500/20 border-x border-yellow-400/40" />
             <span className="text-[10px] text-yellow-400/40 ml-4 font-medium uppercase tracking-widest">Subtitles</span>
          </div>
        </div>
      </div>

      {/* Zoom / Navigation Hint */}
      <div className="h-1 bg-[#2c2c2c] w-full" />
    </div>
  );
};

export default Timeline;
