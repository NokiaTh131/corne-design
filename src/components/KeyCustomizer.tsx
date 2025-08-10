import React from 'react';
import { ColorPicker } from './ColorPicker';
import type { KeycapConfig } from '../types/index';
import type { ColorTheme } from '../constants/themes';

interface KeyCustomizerProps {
  selectedKey: KeycapConfig | null;
  onKeyUpdate: (keyId: string, updates: Partial<KeycapConfig>) => void;
  theme: ColorTheme;
}

export const KeyCustomizer: React.FC<KeyCustomizerProps> = ({
  selectedKey,
  onKeyUpdate,
  theme
}) => {
  if (!selectedKey) {
    return (
      <div 
        className="rounded-lg p-6 border text-center"
        style={{ 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border 
        }}
      >
        <div style={{ color: theme.colors.textMuted }}>
          <svg className="w-8 h-8 mx-auto mb-3 opacity-40" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm">Select a key to customize</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div 
        className="rounded-lg p-4 border"
        style={{ 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border 
        }}
      >
        <h3 
          className="text-sm font-medium mb-3"
          style={{ color: theme.colors.text }}
        >
          Key Label
        </h3>
        <input
          type="text"
          value={selectedKey.label}
          onChange={(e) => onKeyUpdate(selectedKey.id, { label: e.target.value.slice(0, 3) })}
          placeholder="Label"
          maxLength={3}
          className="w-full rounded-md px-3 py-2 text-sm border focus:outline-none focus:ring-1 transition-all"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            color: theme.colors.text
          }}
        />
        <p 
          className="text-xs mt-1"
          style={{ color: theme.colors.textMuted }}
        >
          Max 3 characters
        </p>
      </div>

      <ColorPicker
        colors={theme.colors.keycapColors}
        selectedColor={selectedKey.color}
        onColorSelect={(color) => onKeyUpdate(selectedKey.id, { color })}
        title="Keycap Color"
        theme={theme}
      />

      <div 
        className="rounded-lg p-4 border"
        style={{ 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border 
        }}
      >
        <h3 
          className="text-sm font-medium mb-2"
          style={{ color: theme.colors.text }}
        >
          Position
        </h3>
        <div 
          className="text-sm"
          style={{ color: theme.colors.textMuted }}
        >
          {selectedKey.keyType === 'thumb' 
            ? `Thumb key ${selectedKey.position.col - 1.5 + 1}`
            : `Row ${selectedKey.position.row + 1}, Col ${selectedKey.position.col + 1}`
          }
        </div>
      </div>
    </div>
  );
};