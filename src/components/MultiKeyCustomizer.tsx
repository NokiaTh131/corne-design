import { ColorPicker } from './ColorPicker';
import type { KeycapConfig } from '../types/index';
import type { ColorTheme } from '../constants/themes';
import { Users, Square, MousePointer } from 'lucide-react';

interface MultiKeyCustomizerProps {
  selectedKeys: KeycapConfig[];
  onUpdateSelectedKeys: (updates: Partial<KeycapConfig>) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  theme: ColorTheme;
  customColors: string[];
  onAddCustomColor: (color: string) => void;
}

export const MultiKeyCustomizer: React.FC<MultiKeyCustomizerProps> = ({
  selectedKeys,
  onUpdateSelectedKeys,
  onSelectAll,
  onClearSelection,
  theme,
  customColors,
  onAddCustomColor
}) => {
  if (selectedKeys.length === 0) {
    return (
      <div 
        className="rounded-lg p-6 border text-center"
        style={{ 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border 
        }}
      >
        <div style={{ color: theme.colors.textMuted }}>
          <MousePointer className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm mb-2">No keys selected</p>
          <p className="text-xs opacity-75">
            Click a key or Ctrl+Click to select multiple
          </p>
        </div>
      </div>
    );
  }

  const allColors = [...customColors, ...theme.colors.keycapColors];

  return (
    <div className="space-y-4">
      {/* Selection Info */}
      <div 
        className="rounded-lg p-4 border"
        style={{ 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border 
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users 
              className="w-4 h-4" 
              style={{ color: theme.colors.accent }} 
            />
            <h3 
              className="text-sm font-medium"
              style={{ color: theme.colors.text }}
            >
              Multi-Selection
            </h3>
          </div>
          <div 
            className="text-xs px-2 py-1 rounded-md"
            style={{ 
              backgroundColor: theme.colors.accent + '20',
              color: theme.colors.accent 
            }}
          >
            {selectedKeys.length} selected
          </div>
        </div>

        {/* Selection Controls */}
        <div className="flex gap-2">
          <button
            onClick={onSelectAll}
            className="flex-1 py-2 px-3 rounded-md text-xs border transition-all hover:scale-105"
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              color: theme.colors.text
            }}
          >
            <Square className="w-3 h-3 inline mr-1" />
            Select All
          </button>
          <button
            onClick={onClearSelection}
            className="flex-1 py-2 px-3 rounded-md text-xs border transition-all hover:scale-105"
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              color: theme.colors.textMuted
            }}
          >
            Clear
          </button>
        </div>

        {/* Selected Keys Preview */}
        <div className="mt-3">
          <div className="text-xs mb-2" style={{ color: theme.colors.textMuted }}>
            Selected Keys:
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedKeys.slice(0, 12).map((key) => (
              <div
                key={key.id}
                className="w-6 h-6 rounded border flex items-center justify-center text-[8px] font-mono"
                style={{
                  backgroundColor: key.color,
                  borderColor: theme.colors.border,
                  color: getTextColor(key.color)
                }}
              >
                {key.label}
              </div>
            ))}
            {selectedKeys.length > 12 && (
              <div 
                className="text-xs flex items-center px-1"
                style={{ color: theme.colors.textMuted }}
              >
                +{selectedKeys.length - 12}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Color Picker for Multiple Keys */}
      <ColorPicker
        colors={allColors}
        selectedColor={selectedKeys[0]?.color || theme.colors.keycapColors[0]}
        onColorSelect={(color) => {
          onUpdateSelectedKeys({ color });
        }}
        title="Change Color for Selected Keys"
        theme={theme}
        onAddCustomColor={onAddCustomColor}
      />
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