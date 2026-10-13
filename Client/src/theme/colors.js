import { defineConfig } from "@chakra-ui/react";

export const colorConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // ==========================================
        // BRAND COLORS — EDIT THESE VALUES
        // ==========================================
        primary: {
          value: "#881938",
        },
        secondary: {
          value: "#FFD166",
        },
        tertiary: {
          value: "#3A86FF",
        },
        neutral: {
          value: "#1E2238",
        },

        // Supporting colors
        white: {
          value: "#FFFFFF",
        },
        black: {
          value: "#000000",
        },
        transparent: {
          value: "transparent",
        },
        text: {
          value: "#594E50",
        },

        // Soft brand surfaces
        primarySoft: {
          value: "#FFF0F3",
        },
        secondarySoft: {
          value: "#FFF7DF",
        },
        tertiarySoft: {
          value: "#EBF2FF",
        },

        // Brand-derived shades for charts, gradients,
        // hover states and decorative elements.
        primaryDark: {
          value: "#B83250",
        },
        secondaryDark: {
          value: "#8A6500",
        },
        tertiaryDark: {
          value: "#005BC4",
        },

        // Neutral shades
        neutralSoft: {
          value: "#F3F4FA",
        },
        neutralMuted: {
          value: "#73778D",
        },
        neutralBorder: {
          value: "#DFE2F0",
        },
      },
    },

    // ==========================================
    // SEMANTIC COLORS — USE THESE IN COMPONENTS
    // ==========================================
    semanticTokens: {
      colors: {
        // Brand intent
        brand: {
          solid: {
            value: "{colors.primary}",
          },
          contrast: {
            value: "{colors.white}",
          },
          fg: {
            value: "{colors.primaryDark}",
          },
          subtle: {
            value: "{colors.primarySoft}",
          },
          focusRing: {
            value: "{colors.primary}",
          },
        },

        // Action colors
        action: {
          primary: {
            value: "{colors.primary}",
          },
          secondary: {
            value: "{colors.secondary}",
          },
          tertiary: {
            value: "{colors.tertiary}",
          },
          destructive: {
            value: "#D92D35",
          },
        },

        // Backgrounds
        bg: {
          canvas: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.neutral}",
            },
          },
          surface: {
            value: {
              _light: "{colors.neutralSoft}",
              _dark: "#292E48",
            },
          },
          elevated: {
            value: {
              _light: "{colors.white}",
              _dark: "#343A57",
            },
          },
          accent: {
            value: {
              _light: "{colors.primarySoft}",
              _dark: "#492A39",
            },
          },
        },

        // Text and icons
        fg: {
          DEFAULT: {
            value: {
              _light: "{colors.neutral}",
              _dark: "#F7F7FC",
            },
          },
          muted: {
            value: {
              _light: "{colors.neutralMuted}",
              _dark: "#B4B8CC",
            },
          },
          subtle: {
            value: {
              _light: "#9296A8",
              _dark: "#9096B0",
            },
          },
          inverted: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.neutral}",
            },
          },
        },

        // Borders and dividers
        border: {
          DEFAULT: {
            value: {
              _light: "{colors.neutralBorder}",
              _dark: "#414761",
            },
          },
          muted: {
            value: {
              _light: "#ECEEF7",
              _dark: "#343A53",
            },
          },
          accent: {
            value: "{colors.primary}",
          },
        },

        // Feedback colors
        status: {
          success: {
            value: "#16845B",
          },
          warning: {
            value: "#946600",
          },
          error: {
            value: "#D92D35",
          },
          info: {
            value: "{colors.tertiary}",
          },
        },
      },
    },
  },
});
