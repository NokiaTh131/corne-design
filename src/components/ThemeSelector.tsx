import { useState } from 'react';
import type { ColorTheme } from '../constants/themes';
import { ChevronDown, Palette } from 'lucide-react';

interface ThemeSelectorProps {
  themes: Record<string, ColorTheme>;
  selectedTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
  onApplyTheme: (theme: ColorTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  selectedTheme,
  onThemeChange,
  onApplyTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (theme: ColorTheme) => {
    onThemeChange(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div 
        className="p-4 rounded-lg border"
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
            Color Theme
          </h3>
          <Palette 
            className="w-4 h-4" 
            style={{ color: selectedTheme.colors.accent }} 
          />
        </div>

        {/* Theme Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-3 rounded-md border text-left transition-all duration-200"
            style={{ 
              backgroundColor: selectedTheme.colors.background,
              borderColor: selectedTheme.colors.border,
              color: selectedTheme.colors.text 
            }}
          >
            <div>
              <div className="font-medium">{selectedTheme.name}</div>
              <div 
                className="text-xs"
                style={{ color: selectedTheme.colors.textMuted }}
              >
                {selectedTheme.description}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div 
              className="absolute top-full left-0 right-0 mt-1 rounded-md border shadow-lg z-10"
              style={{ 
                backgroundColor: selectedTheme.colors.surface,
                borderColor: selectedTheme.colors.border 
              }}
            >
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeSelect(theme)}
                  className="w-full p-3 text-left hover:opacity-80 transition-opacity first:rounded-t-md last:rounded-b-md"
                  style={{ 
                    backgroundColor: theme === selectedTheme ? selectedTheme.colors.background : 'transparent'
                  }}
                >
                  <div 
                    className="font-medium mb-1"
                    style={{ color: selectedTheme.colors.text }}
                  >
                    {theme.name}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: selectedTheme.colors.textMuted }}
                  >
                    {theme.description}
                  </div>
                  
                  {/* Color Preview */}
                  <div className="flex gap-1 mt-2">
                    {theme.colors.keycapColors.slice(0, 8).map((color, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-sm border"
                        style={{ 
                          backgroundColor: color,
                          borderColor: selectedTheme.colors.border 
                        }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Apply Theme Button */}
        <button
          onClick={() => onApplyTheme(selectedTheme)}
          className="w-full mt-3 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: selectedTheme.colors.accent,
            color: selectedTheme.colors.background
          }}
        >
          Apply Theme to Keyboard
        </button>
      </div>
    </div>
  );
};