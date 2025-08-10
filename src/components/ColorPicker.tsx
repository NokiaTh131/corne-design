import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Palette, X } from 'lucide-react';
import type { ColorTheme } from '../constants/themes';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
  title: string;
  theme: ColorTheme;
  onAddCustomColor?: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  onColorSelect,
  title,
  theme,
  onAddCustomColor
}) => {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customColor, setCustomColor] = useState(selectedColor);

  const handleCustomColorSelect = () => {
    onColorSelect(customColor);
    if (onAddCustomColor && !colors.includes(customColor)) {
      onAddCustomColor(customColor);
    }
    setShowCustomPicker(false);
  };

  return (
    <div 
      className="rounded-lg p-4 border"
      style={{ 
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border 
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 
          className="text-sm font-medium"
          style={{ color: theme.colors.text }}
        >
          {title}
        </h3>
        <button
          onClick={() => setShowCustomPicker(!showCustomPicker)}
          className="p-1.5 rounded-md transition-colors hover:scale-105"
          style={{ 
            color: theme.colors.textMuted,
            backgroundColor: showCustomPicker ? theme.colors.background : 'transparent'
          }}
          title="Custom color picker"
        >
          <Palette className="w-4 h-4" />
        </button>
      </div>

      {showCustomPicker && (
        <div 
          className="mb-4 p-3 rounded-lg border"
          style={{ 
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border 
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span 
              className="text-xs font-medium"
              style={{ color: theme.colors.text }}
            >
              Custom Color
            </span>
            <button
              onClick={() => setShowCustomPicker(false)}
              className="p-1 rounded transition-colors hover:scale-105"
              style={{ color: theme.colors.textMuted }}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-3">
            <HexColorPicker 
              color={customColor} 
              onChange={setCustomColor}
              className="!w-full !h-32"
            />
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="flex-1 rounded px-2 py-1 text-xs border focus:outline-none focus:ring-1 transition-all"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  color: theme.colors.text
                }}
                placeholder="#000000"
              />
              <button
                onClick={handleCustomColorSelect}
                className="px-3 py-1 rounded text-xs transition-all hover:scale-105"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.background
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-6 gap-1.5">
        {colors.map((color, index) => (
          <div key={color} className="relative">
            <button
              className={`
                w-7 h-7 rounded-md border cursor-pointer
                transition-all duration-200
                hover:scale-110
                ${selectedColor === color ? 'ring-1' : ''}
              `}
              style={{ 
                backgroundColor: color,
                borderColor: theme.colors.border + '60',
                ...(selectedColor === color && {
                  '--tw-ring-color': theme.colors.accent
                })
              }}
              onClick={() => onColorSelect(color)}
              aria-label={`Select color ${color}`}
            />
            {/* Custom color indicator */}
            {index < (onAddCustomColor ? 12 : 0) && onAddCustomColor && (
              <div 
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full text-[8px] flex items-center justify-center"
                style={{ 
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.background 
                }}
                title="Custom color"
              >
                •
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};