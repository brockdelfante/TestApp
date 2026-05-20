import React from 'react';

const Timeline = ({ clips, activeIndex, onSelectClip }) => {
  return (
    <div className="bg-[#1c1b1b] h-64 border-t border-[#2c2c2c] flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2c2c2c] bg-[#1a1a19]">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-primary font-bold">TIMELINE</span>
        </div>
      </div>

      <div className="flex-1 relative overflow-x-auto overflow-y-hidden bg-[#131313] p-4">
        <div className="flex gap-1 h-full items-start">
          {clips.map((clip, idx) => (
            <button
              key={clip.id}
              onClick={() => onSelectClip(idx)}
              className={`h-20 rounded-md border-2 transition-all flex flex-col items-center justify-center p-2 min-w-[120px]
                ${activeIndex === idx ? 'border-primary bg-[#2a2a2a]' : 'border-transparent bg-[#1e1e1e] opacity-60'}`}
            >
              <div className="w-full h-8 bg-black/40 rounded mb-1 flex items-center justify-center">
                 <span className="text-[8px] font-mono text-white/40">Clip ${idx + 1}</span>
              </div>
              <span className="text-[10px] font-medium truncate w-full text-center">
                ${clip.speed}x • ${clip.filter}
              </span>
            </button>
          ))}
          <button className="h-20 w-20 border-2 border-dashed border-[#2c2c2c] rounded-md flex items-center justify-center text-[#2c2c2c]">
            <span class="text-xl">+</span>
          </button>
        </div>

        {/* Playhead Placeholder */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 pointer-events-none" />
      </div>
    </div>
  );
};

export default Timeline;
