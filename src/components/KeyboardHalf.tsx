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
  const thumbKeys = keys.filter(key => key.keyType === 'thumb').sort((a, b) => a.position.col - b.position.col);

  const handleKeyClick = (keyId: string, event: React.MouseEvent) => {
    const isCtrlOrCmd = event.ctrlKey || event.metaKey;
    onKeySelect(keyId, isCtrlOrCmd);
  };

  return (
    <div className="relative">
      <div 
        className="rounded-xl p-5 border backdrop-blur-sm"
        style={{ 
          backgroundColor: theme.colors.surface + '80',
          borderColor: theme.colors.border + '40'
        }}
      >
        {/* Main key grid with column stagger */}
        <div className="relative">
          {/* Column-based layout */}
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4, 5].map(colIndex => (
              <div
                key={colIndex}
                className="flex flex-col gap-1"
                style={{
                  transform: side === 'left' 
                    ? `translateY(${COLUMN_STAGGER[colIndex]}px)` 
                    : `translateY(${COLUMN_STAGGER[5 - colIndex]}px)`,
                }}
              >
                {[0, 1, 2].map(rowIndex => {
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
                    <div key={`${rowIndex}-${colIndex}`} className="w-12 h-12" />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        {/* Thumb cluster */}
        <div className="flex justify-center mt-5 gap-1">
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