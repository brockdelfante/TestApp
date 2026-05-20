import React from 'react';

const Timeline = () => {
  return (
    <div className="bg-[#1c1b1b] h-64 border-t border-[#2c2c2c] p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 text-xs text-[#cac3d8]">
          <span>00:00:00:00</span>
          <button className="hover:text-[#7c4dff]">Mute</button>
        </div>
      </div>
      <div className="relative h-40 overflow-x-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#7c4dff] z-10"></div>
        <div className="flex flex-col gap-1 min-w-[200%]">
          <div className="h-12 bg-[#353534] rounded border border-[#2c2c2c] flex items-center px-2">Video Track</div>
          <div className="h-8 bg-blue-900/30 rounded border border-blue-500/50 flex items-center px-2 text-[10px]">Audio Track</div>
          <div className="h-8 bg-yellow-900/30 rounded border border-yellow-500/50 flex items-center px-2 text-[10px]">Text Track</div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
