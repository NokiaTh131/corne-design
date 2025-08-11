import React from 'react';
import { Box, Layers3 } from 'lucide-react';
import type { ColorTheme } from '../constants/themes';

interface ViewToggleProps {
  is3D: boolean;
  onToggle: (is3D: boolean) => void;
  theme: ColorTheme;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ is3D, onToggle, theme }) => {
  return (
    <div className="flex items-center space-x-2 p-1 rounded-lg border" 
         style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
      <button
        onClick={() => onToggle(false)}
        className={`
          flex items-center space-x-1 px-3 py-2 rounded text-sm font-medium transition-colors
          ${!is3D ? 'shadow-sm' : ''}
        `}
        style={{
          backgroundColor: !is3D ? theme.colors.accent : 'transparent',
          color: !is3D ? '#ffffff' : theme.colors.text
        }}
      >
        <Box size={16} />
        <span>2D</span>
      </button>
      <button
        onClick={() => onToggle(true)}
        className={`
          flex items-center space-x-1 px-3 py-2 rounded text-sm font-medium transition-colors
          ${is3D ? 'shadow-sm' : ''}
        `}
        style={{
          backgroundColor: is3D ? theme.colors.accent : 'transparent',
          color: is3D ? '#ffffff' : theme.colors.text
        }}
      >
        <Layers3 size={16} />
        <span>3D</span>
      </button>
    </div>
  );
};