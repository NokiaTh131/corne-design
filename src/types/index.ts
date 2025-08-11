export interface KeycapConfig {
  id: string;
  color: string;
  label: string;
  position: {
    row: number;
    col: number;
  };
  keyType: 'main' | 'thumb' | 'extra' | 'special';
}

export interface KeyboardConfig {
  leftKeys: KeycapConfig[];
  rightKeys: KeycapConfig[];
  cableColor: string;
}

export interface KeyboardTheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
}