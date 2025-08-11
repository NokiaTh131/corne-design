import React from 'react';
import { Keycap } from './Keycap';
import type { KeycapConfig } from '../types/index';
import type { ColorTheme } from '../constants/themes';
import { COLUMN_STAGGER } from '../constants/keyboard';

interface KeyboardHalfProps {
  keys: KeycapConfig[];
  side: 'left' | 'right';
  onKeySelect: (keyId: string, isCtrlOrCmd: boolean) => void;
  selectedKeys: Set<string>;
  theme: ColorTheme;
}

export const KeyboardHalf: React.FC<KeyboardHalfProps> = ({
  keys,
  side,
  onKeySelect,
  selectedKeys,
  theme
}) => {
  const mainKeys = keys.filter(key => key.keyType === 'main');
  const extraKeys = keys.filter(key => key.keyType === 'extra');
  const specialKeys = keys.filter(key => key.keyType === 'special');
  const thumbKeys = keys.filter(key => key.keyType === 'thumb').sort((a, b) => a.position.col - b.position.col);

  const handleKeyClick = (keyId: string, event: React.MouseEvent) => {
    const isCtrlOrCmd = event.ctrlKey || event.metaKey;
    onKeySelect(keyId, isCtrlOrCmd);
  };

  return (
    <div className="relative">
      <div
        className="rounded-2xl p-8 border"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border + '40'
        }}
      >
        {/* Main key grid with column stagger */}
        <div className="relative">
          {/* Column-based layout */}
          <div className="flex gap-2">
            {(side === 'left' ? [-1, 0, 1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5, 6]).map(colIndex => (
              <div
                key={colIndex}
                className="flex flex-col gap-2"
                style={{
                  transform: side === 'left'
                    ? `translateY(${COLUMN_STAGGER[Math.max(colIndex, 0)] * 1.5}px)`
                    : `translateY(${COLUMN_STAGGER[Math.min(colIndex, 5)] * 1.5}px)`,
                }}
              >
                {[0, 1, 2].map(rowIndex => {
                  // Check for extra keys first
                  const extraKey = extraKeys.find(k => k.position.row === rowIndex && k.position.col === colIndex);
                  if (extraKey) {
                    return (
                      <Keycap
                        key={extraKey.id}
                        keycap={extraKey}
                        onClick={(event) => handleKeyClick(extraKey.id, event)}
                        isSelected={selectedKeys.has(extraKey.id)}
                        theme={theme}
                      />
                    );
                  }
                  
                  // Check for special keys
                  const specialKey = specialKeys.find(k => k.position.row === rowIndex && k.position.col === colIndex);
                  if (specialKey) {
                    return (
                      <Keycap
                        key={specialKey.id}
                        keycap={specialKey}
                        onClick={(event) => handleKeyClick(specialKey.id, event)}
                        isSelected={selectedKeys.has(specialKey.id)}
                        theme={theme}
                      />
                    );
                  }
                  
                  // Then check for main keys
                  const key = mainKeys.find(k => k.position.row === rowIndex && k.position.col === colIndex);
                  return key ? (
                    <Keycap
                      key={key.id}
                      keycap={key}
                      onClick={(event) => handleKeyClick(key.id, event)}
                      isSelected={selectedKeys.has(key.id)}
                      theme={theme}
                    />
                  ) : (
                    <div key={`${rowIndex}-${colIndex}`} className="w-16 h-16" />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Thumb cluster */}
        <div className="flex justify-center mt-6 gap-2">
          {thumbKeys.map((key) => (
            <Keycap
              key={key.id}
              keycap={key}
              onClick={(event) => handleKeyClick(key.id, event)}
              isSelected={selectedKeys.has(key.id)}
              theme={theme}
            />
          ))}
        </div>

        <div className="text-center mt-3">
          <div
            className="text-xs font-light tracking-wider opacity-60"
            style={{ color: theme.colors.textMuted }}
          >
            {side.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
