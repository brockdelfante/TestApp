import React from 'react';
import { Scissors, Music, Type, Square, Layers, Sparkles, Filter, Maximize, Layout, Settings2 } from 'lucide-react';

const tools = [
  { icon: Scissors, label: 'Edit' },
  { icon: Music, label: 'Audio' },
  { icon: Type, label: 'Text' },
  { icon: Square, label: 'Stickers' },
  { icon: Layers, label: 'Overlay' },
  { icon: Sparkles, label: 'Effects' },
  { icon: Filter, label: 'Filters' },
  { icon: Maximize, label: 'Format' },
  { icon: Layout, label: 'Canvas' },
  { icon: Settings2, label: 'Adjust' },
];

const Toolbar = () => {
  return (
    <div className="bg-[#201f1f] h-20 flex items-center px-4 gap-6 overflow-x-auto border-t border-[#2c2c2c]">
      {tools.map((tool, idx) => (
        <button key={idx} className="flex flex-col items-center gap-1 min-w-[50px] text-[#cac3d8] hover:text-[#7c4dff] transition-colors">
          <tool.icon size={20} />
          <span className="text-[10px]">{tool.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
