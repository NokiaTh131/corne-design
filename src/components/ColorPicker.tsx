import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Palette } from 'lucide-react';
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 
          className="text-sm font-medium"
          style={{ color: theme.colors.text }}
        >
          {title}
        </h3>
        <button
          onClick={() => setShowCustomPicker(!showCustomPicker)}
          className="p-1 rounded text-xs"
          style={{ 
            color: theme.colors.textMuted,
            backgroundColor: showCustomPicker ? theme.colors.surface : 'transparent'
          }}
          title="Custom color"
        >
          <Palette className="w-3 h-3" />
        </button>
      </div>

      {showCustomPicker && (
        <div 
          className="p-3 rounded border"
          style={{ 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border 
          }}
        >
          <div className="space-y-2">
            <HexColorPicker 
              color={customColor} 
              onChange={setCustomColor}
              className="!w-full !h-24"
            />
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="flex-1 rounded px-2 py-1 text-xs border"
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                  color: theme.colors.text
                }}
                placeholder="#000000"
              />
              <button
                onClick={handleCustomColorSelect}
                className="px-2 py-1 rounded text-xs"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.background
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-8 gap-1">
        {colors.map((color) => (
          <button
            key={color}
            className={`
              w-5 h-5 rounded border cursor-pointer
              ${selectedColor === color ? 'ring-1' : ''}
            `}
            style={{ 
              backgroundColor: color,
              borderColor: theme.colors.border,
              ...(selectedColor === color && {
                '--tw-ring-color': theme.colors.accent
              })
            }}
            onClick={() => onColorSelect(color)}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );
};