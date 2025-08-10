import type { KeycapConfig } from '../types/index';

export const DEFAULT_KEYCAP_COLORS = [
  '#1f2937', // gray-800
  '#374151', // gray-700
  '#6b7280', // gray-500
  '#f3f4f6', // gray-100
  '#ffffff', // white
  '#ef4444', // red-500
  '#f97316', // orange-500
  '#eab308', // yellow-500
  '#22c55e', // green-500
  '#3b82f6', // blue-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
];

export const DEFAULT_CABLE_COLORS = [
  '#000000', // black
  '#ffffff', // white
  '#ef4444', // red
  '#3b82f6', // blue
  '#22c55e', // green
  '#eab308', // yellow
  '#8b5cf6', // purple
  '#ec4899', // pink
];

// Corne keyboard layout: 3x6 main keys + 3 thumb keys per side
export const DEFAULT_LEFT_KEYS: KeycapConfig[] = [
  // Main keys (3 rows x 6 columns)
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `left-main-${i}`,
    color: '#374151',
    label: '',
    position: {
      row: Math.floor(i / 6),
      col: i % 6,
    },
    keyType: 'main' as const,
  })),
  // Thumb keys (3 keys)
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `left-thumb-${i}`,
    color: '#374151',
    label: '',
    position: {
      row: 3, // Thumb row
      col: i + 1.5, // Centered under main keys
    },
    keyType: 'thumb' as const,
  })),
];

export const DEFAULT_RIGHT_KEYS: KeycapConfig[] = [
  // Main keys (3 rows x 6 columns)
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `right-main-${i}`,
    color: '#374151',
    label: '',
    position: {
      row: Math.floor(i / 6),
      col: i % 6,
    },
    keyType: 'main' as const,
  })),
  // Thumb keys (3 keys)
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `right-thumb-${i}`,
    color: '#374151',
    label: '',
    position: {
      row: 3, // Thumb row
      col: i + 1.5, // Centered under main keys
    },
    keyType: 'thumb' as const,
  })),
];

// Corne layout labels (QWERTY)
export const CORNE_LAYOUT_LABELS = {
  left: {
    main: [
      ['Q', 'W', 'E', 'R', 'T', 'Y'],
      ['A', 'S', 'D', 'F', 'G', 'H'],
      ['Z', 'X', 'C', 'V', 'B', 'N'],
    ],
    thumb: ['GUI', 'LWR', 'SPC'],
  },
  right: {
    main: [
      ['Y', 'U', 'I', 'O', 'P', '['],
      ['H', 'J', 'K', 'L', ';', "'"],
      ['N', 'M', ',', '.', '/', 'SHFT'],
    ],
    thumb: ['ENT', 'RSE', 'ALT'],
  },
};

// Column stagger offsets (in pixels) for each column - reversed pattern
export const COLUMN_STAGGER = [0, -4, -12, -16, -8, 0]; // Column stagger pattern