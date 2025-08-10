import React from 'react';
import { ColorPicker } from './ColorPicker';
import type { ColorTheme } from '../constants/themes';

interface CableCustomizerProps {
  cableColor: string;
  onCableColorChange: (color: string) => void;
  theme: ColorTheme;
}

export const CableCustomizer: React.FC<CableCustomizerProps> = ({
  cableColor,
  onCableColorChange,
  theme
}) => {
  return (
    <ColorPicker
      colors={theme.colors.cableColors}
      selectedColor={cableColor}
      onColorSelect={onCableColorChange}
      title="Cable Color"
      theme={theme}
    />
  );
};