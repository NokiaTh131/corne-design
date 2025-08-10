import { useState } from 'react';
import { KeyboardHalf } from './components/KeyboardHalf';
import { CableConnector } from './components/CableConnector';
import { KeyCustomizer } from './components/KeyCustomizer';
import { MultiKeyCustomizer } from './components/MultiKeyCustomizer';
import { ThemeSelector } from './components/ThemeSelector';
import { useKeyboard } from './hooks/useKeyboard';
import { COLOR_THEMES } from './constants/themes';
import type { ColorTheme } from './constants/themes';

function App() {
  const {
    keyboardConfig,
    selectedKeys,
    customColors,
    toggleKeySelection,
    selectAllKeys,
    clearSelection,
    updateKey,
    updateSelectedKeys,
    updateCableColor,
    getSelectedKeysConfig,
    addCustomColor,
    resetToDefault,
  } = useKeyboard();

  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(COLOR_THEMES.nord);

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: selectedTheme.colors.background }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Minimal Header */}
        <header className="text-center mb-12">
          <h1 
            className="text-4xl font-light tracking-tight mb-2"
            style={{ color: selectedTheme.colors.text }}
          >
            Corne Designer
          </h1>
          <p 
            className="text-sm"
            style={{ color: selectedTheme.colors.textMuted }}
          >
            3×6+3 Split Keyboard Visualizer
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Keyboard Display */}
          <div className="lg:col-span-2">
            <div className="flex flex-col items-center space-y-8">
              <div className="flex items-center gap-6">
                <KeyboardHalf
                  keys={keyboardConfig.leftKeys}
                  side="left"
                  onKeySelect={toggleKeySelection}
                  selectedKeys={selectedKeys}
                  theme={selectedTheme}
                />
                <CableConnector 
                  cableColor={keyboardConfig.cableColor}
                />
                <KeyboardHalf
                  keys={keyboardConfig.rightKeys}
                  side="right"
                  onKeySelect={toggleKeySelection}
                  selectedKeys={selectedKeys}
                  theme={selectedTheme}
                />
              </div>
              
              {/* Helper Text */}
              <div className="text-center">
                <p 
                  className="text-xs opacity-60"
                  style={{ color: selectedTheme.colors.textMuted }}
                >
                  Click keys to select • Ctrl+Click for multi-select
                </p>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            <ThemeSelector
              themes={COLOR_THEMES}
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
              onApplyTheme={(theme) => {
                // Apply theme colors to keyboard
                const allKeys = [...keyboardConfig.leftKeys, ...keyboardConfig.rightKeys];
                allKeys.forEach((key, index) => {
                  const colorIndex = index % theme.colors.keycapColors.length;
                  updateKey(key.id, { color: theme.colors.keycapColors[colorIndex] });
                });
                updateCableColor(theme.colors.cableColors[0]);
              }}
            />
            
            {selectedKeys.size > 0 ? (
              <MultiKeyCustomizer
                selectedKeys={getSelectedKeysConfig()}
                onUpdateSelectedKeys={updateSelectedKeys}
                onSelectAll={selectAllKeys}
                onClearSelection={clearSelection}
                theme={selectedTheme}
                customColors={customColors}
                onAddCustomColor={addCustomColor}
              />
            ) : (
              <KeyCustomizer
                selectedKey={null}
                onKeyUpdate={updateKey}
                theme={selectedTheme}
              />
            )}

            {/* Cable Customizer */}
            <div 
              className="rounded-lg p-4 border"
              style={{ 
                backgroundColor: selectedTheme.colors.surface,
                borderColor: selectedTheme.colors.border 
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 
                  className="text-sm font-medium"
                  style={{ color: selectedTheme.colors.text }}
                >
                  Cable Color
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {selectedTheme.colors.cableColors.map((color) => (
                  <button
                    key={color}
                    className={`
                      w-7 h-7 rounded-md border cursor-pointer
                      transition-all duration-200
                      hover:scale-110
                      ${keyboardConfig.cableColor === color ? 'ring-1' : ''}
                    `}
                    style={{ 
                      backgroundColor: color,
                      borderColor: selectedTheme.colors.border + '60',
                      ...(keyboardConfig.cableColor === color && {
                        '--tw-ring-color': selectedTheme.colors.accent
                      })
                    }}
                    onClick={() => updateCableColor(color)}
                    aria-label={`Select cable color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={resetToDefault}
                className="px-4 py-2 text-sm rounded-md border transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: selectedTheme.colors.surface,
                  borderColor: selectedTheme.colors.border,
                  color: selectedTheme.colors.textMuted 
                }}
              >
                Reset Layout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
