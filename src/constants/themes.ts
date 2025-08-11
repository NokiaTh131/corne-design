export interface ColorTheme {
  name: string;
  description: string;
  colors: {
    background: string;
    surface: string;
    border: string;
    text: string;
    textMuted: string;
    accent: string;
    keycapColors: string[];
    cableColors: string[];
  };
}

export const COLOR_THEMES: Record<string, ColorTheme> = {
  nord: {
    name: "Nord",
    description: "Arctic, north-bluish clean and elegant",
    colors: {
      background: "#2e3440",
      surface: "#3b4252",
      border: "#4c566a",
      text: "#eceff4",
      textMuted: "#d8dee9",
      accent: "#5e81ac",
      keycapColors: [
        "#2e3440", // polar night
        "#3b4252",
        "#434c5e",
        "#4c566a",
        "#d8dee9", // snow storm
        "#e5e9f0",
        "#eceff4",
        "#8fbcbb", // frost
        "#88c0d0",
        "#81a1c1",
        "#5e81ac",
        "#bf616a", // aurora
        "#d08770",
        "#ebcb8b",
        "#a3be8c",
        "#b48ead",
      ],
      cableColors: [
        "#2e3440",
        "#4c566a",
        "#5e81ac",
        "#88c0d0",
        "#bf616a",
        "#d08770",
        "#ebcb8b",
        "#a3be8c",
      ],
    },
  },

  catppuccin: {
    name: "Catppuccin Mocha",
    description: "Soothing pastel theme for the high-spirited",
    colors: {
      background: "#1e1e2e",
      surface: "#313244",
      border: "#45475a",
      text: "#cdd6f4",
      textMuted: "#bac2de",
      accent: "#cba6f7",
      keycapColors: [
        "#1e1e2e", // base
        "#313244", // mantle
        "#45475a", // surface0
        "#585b70", // surface1
        "#6c7086", // surface2
        "#7f849c", // overlay0
        "#9399b2", // overlay1
        "#a6adc8", // overlay2
        "#bac2de", // subtext1
        "#cdd6f4", // text
        "#f38ba8", // pink
        "#eba0ac", // flamingo
        "#fab387", // peach
        "#f9e2af", // yellow
        "#a6e3a1", // green
        "#94e2d5", // teal
        "#89dceb", // sky
        "#74c7ec", // sapphire
        "#89b4fa", // blue
        "#cba6f7", // lavender
        "#f2cdcd", // rosewater
      ],
      cableColors: [
        "#1e1e2e",
        "#45475a",
        "#cba6f7",
        "#89b4fa",
        "#f38ba8",
        "#fab387",
        "#a6e3a1",
        "#94e2d5",
      ],
    },
  },

  rosePine: {
    name: "Rosé Pine",
    description: "All natural pine, faux fur and a bit of soho vibes",
    colors: {
      background: "#191724",
      surface: "#1f1d2e",
      border: "#403d52",
      text: "#e0def4",
      textMuted: "#908caa",
      accent: "#c4a7e7",
      keycapColors: [
        "#191724", // base
        "#1f1d2e", // surface
        "#26233a", // overlay
        "#403d52", // muted
        "#6e6a86", // subtle
        "#908caa", // text
        "#e0def4", // love
        "#eb6f92", // love
        "#f6c177", // gold
        "#ebbcba", // rose
        "#31748f", // pine
        "#9ccfd8", // foam
        "#c4a7e7", // iris
      ],
      cableColors: [
        "#191724",
        "#403d52",
        "#c4a7e7",
        "#9ccfd8",
        "#eb6f92",
        "#f6c177",
        "#ebbcba",
        "#31748f",
      ],
    },
  },

  gruvbox: {
    name: "Gruvbox Dark",
    description: "Retro groove color scheme",
    colors: {
      background: "#282828",
      surface: "#3c3836",
      border: "#504945",
      text: "#ebdbb2",
      textMuted: "#a89984",
      accent: "#d3869b",
      keycapColors: [
        "#282828", // dark0
        "#3c3836", // dark1
        "#504945", // dark2
        "#665c54", // dark3
        "#7c6f64", // dark4
        "#928374", // gray
        "#a89984", // light4
        "#bdae93", // light3
        "#d5c4a1", // light2
        "#ebdbb2", // light1
        "#fbf1c7", // light0
        "#cc241d", // red
        "#d65d0e", // orange
        "#d79921", // yellow
        "#98971a", // green
        "#689d6a", // aqua
        "#458588", // blue
        "#b16286", // purple
        "#d3869b", // pink
      ],
      cableColors: [
        "#282828",
        "#504945",
        "#d3869b",
        "#458588",
        "#cc241d",
        "#d79921",
        "#98971a",
        "#b16286",
      ],
    },
  },
};

