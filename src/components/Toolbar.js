import React from 'react';
import { Scissors, Music, Type, Square, Layers, Sparkles, Filter, Maximize, Layout, Settings2 } from 'lucide-react';

const tools = [
  { icon: Music, label: 'Audio' },
  { icon: Type, label: 'Text' },
  { icon: Square, label: 'Stickers' },
  { icon: Layers, label: 'Overlay' },
];

const Toolbar = ({ minimal }) => {
  if (minimal) {
    return (
      <div className="flex items-center gap-6">
        {tools.map((tool, idx) => (
          <button key={idx} className="flex flex-col items-center gap-1 min-w-[50px] text-[#cac3d8] hover:text-primary transition-colors">
            <tool.icon size={20} />
            <span className="text-[10px]">{tool.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return null; // The main app now handles the primary toolbar buttons
};

export default Toolbar;
