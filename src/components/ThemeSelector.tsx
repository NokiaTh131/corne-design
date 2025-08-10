import { useState } from 'react';
import type { ColorTheme } from '../constants/themes';
import { ChevronDown } from 'lucide-react';

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
      <div className="space-y-3">
        <h3 
          className="text-sm font-medium"
          style={{ color: selectedTheme.colors.text }}
        >
          Theme
        </h3>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-2 rounded border text-left"
            style={{ 
              backgroundColor: selectedTheme.colors.surface,
              borderColor: selectedTheme.colors.border,
              color: selectedTheme.colors.text 
            }}
          >
            <span className="text-sm">{selectedTheme.name}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div 
              className="absolute top-full left-0 right-0 mt-1 rounded border shadow-lg z-10"
              style={{ 
                backgroundColor: selectedTheme.colors.surface,
                borderColor: selectedTheme.colors.border 
              }}
            >
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeSelect(theme)}
                  className="w-full p-2 text-left text-sm hover:opacity-70"
                  style={{ 
                    backgroundColor: theme === selectedTheme ? selectedTheme.colors.background : 'transparent',
                    color: selectedTheme.colors.text
                  }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onApplyTheme(selectedTheme)}
          className="w-full py-1.5 px-3 rounded text-xs"
          style={{
            backgroundColor: selectedTheme.colors.accent,
            color: selectedTheme.colors.background
          }}
        >
          Apply Theme
        </button>
      </div>
    </div>
  );
};