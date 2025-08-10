import React from 'react';
import type { KeycapConfig } from '../types/index';
import type { ColorTheme } from '../constants/themes';

interface KeycapProps {
  keycap: KeycapConfig;
  onClick?: (event: React.MouseEvent) => void;
  isSelected?: boolean;
  theme: ColorTheme;
}

export const Keycap: React.FC<KeycapProps> = ({ keycap, onClick, isSelected = false, theme }) => {
  const textColor = getTextColor(keycap.color);
  const isThumbKey = keycap.keyType === 'thumb';

  return (
    <div
      className={`
        w-16 h-16 rounded-lg border cursor-pointer
        flex items-center justify-center
        font-mono text-sm font-medium
        transition-all duration-200
        hover:scale-105 hover:shadow-md
        ${isSelected ? 'ring-1' : ''}
      `}
      style={{
        backgroundColor: keycap.color,
        color: textColor,
        borderColor: isSelected ? theme.colors.accent : '#000000',
        ...(isSelected && {
          '--tw-ring-color': theme.colors.accent
        })
      }}
      onClick={onClick}
    >
      <span className={isThumbKey ? 'text-xs' : 'text-sm'}>{keycap.label}</span>
    </div>
  );
};

function getTextColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#1f2937' : '#f9fafb';
}