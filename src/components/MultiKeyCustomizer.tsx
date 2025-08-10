import { ColorPicker } from './ColorPicker';
import type { KeycapConfig } from '../types/index';
import type { ColorTheme } from '../constants/themes';

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
      <div className="text-center py-8">
        <div style={{ color: theme.colors.textMuted }}>
          <p className="text-sm mb-1">No keys selected</p>
          <p className="text-xs opacity-60">
            Click keys to select
          </p>
        </div>
      </div>
    );
  }

  const allColors = [...customColors, ...theme.colors.keycapColors];

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 
            className="text-sm font-medium"
            style={{ color: theme.colors.text }}
          >
            Selection ({selectedKeys.length})
          </h3>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={onSelectAll}
            className="flex-1 py-1 px-2 rounded text-xs border"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.text
            }}
          >
            All
          </button>
          <button
            onClick={onClearSelection}
            className="flex-1 py-1 px-2 rounded text-xs border"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.textMuted
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <ColorPicker
        colors={allColors}
        selectedColor={selectedKeys[0]?.color || theme.colors.keycapColors[0]}
        onColorSelect={(color) => {
          onUpdateSelectedKeys({ color });
        }}
        title="Colors"
        theme={theme}
        onAddCustomColor={onAddCustomColor}
      />
    </div>
  );
};