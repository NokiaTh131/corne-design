import { useState } from 'react';
import { Download } from 'lucide-react';
import { KeyboardHalf } from './components/KeyboardHalf';
import { CableConnector } from './components/CableConnector';
import { KeyCustomizer } from './components/KeyCustomizer';
import { MultiKeyCustomizer } from './components/MultiKeyCustomizer';
import { ThemeSelector } from './components/ThemeSelector';
import { useKeyboard } from './hooks/useKeyboard';
import { useImageExport } from './hooks/useImageExport';
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

  const { exportAsImage } = useImageExport();
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(COLOR_THEMES.nord);

  const handleExportImage = () => {
    exportAsImage('keyboard-display', 'my-keyboard-design');
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: selectedTheme.colors.background }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Keyboard Display - Centered and Prominent */}
        <div className="flex justify-center mt-10">
          <div id="keyboard-display" className="flex items-center gap-2 scale-110">
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
        </div>


        {/* Controls Panel - Compact */}
        <div className="max-w-3xl mx-auto mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
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
            </div>

            <div>
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
            </div>

            <div className="space-y-4">
              <div>
                <h3
                  className="text-sm font-medium mb-2"
                  style={{ color: selectedTheme.colors.text }}
                >
                  Cable
                </h3>
                <div className="grid grid-cols-4 gap-1">
                  {selectedTheme.colors.cableColors.map((color) => (
                    <button
                      key={color}
                      className={`
                        w-5 h-5 rounded border cursor-pointer
                        ${keyboardConfig.cableColor === color ? 'ring-1' : ''}
                      `}
                      style={{
                        backgroundColor: color,
                        borderColor: selectedTheme.colors.border,
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

              <button
                onClick={handleExportImage}
                className="w-full py-1.5 px-3 text-xs rounded border flex items-center justify-center gap-1"
                style={{
                  backgroundColor: selectedTheme.colors.surface,
                  borderColor: selectedTheme.colors.border,
                  color: selectedTheme.colors.text
                }}
              >
                <Download size={12} />
                Save Image
              </button>

              <button
                onClick={resetToDefault}
                className="w-full py-1.5 px-3 text-xs rounded border"
                style={{
                  backgroundColor: selectedTheme.colors.surface,
                  borderColor: selectedTheme.colors.border,
                  color: selectedTheme.colors.textMuted
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
