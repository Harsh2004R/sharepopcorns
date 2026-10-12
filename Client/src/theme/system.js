import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { colorConfig } from "./colors.js";

const config = defineConfig({
  globalCss: {
    html: {
      fontFamily: "body",
    },
    body: {
      bg: "fg",
      color: "black",
    },
  },

  theme: {
    ...colorConfig.theme,

    tokens: {
      ...colorConfig.theme.tokens,

      // Your existing typography tokens
      fonts: {
        heading: {
          value: "'Header', sans-serif",
        },
        body: {
          value: "'Body', sans-serif",
        },
        caption: {
          value: "'Body', sans-serif",
        },
      },

      fontSizes: {
        heading: { value: "2rem" },
        paragraph: { value: "1rem" },
        caption: { value: "0.75rem" },
      },

      fontWeights: {
        heading: { value: "400" },
        paragraph: { value: "400" },
        caption: { value: "400" },
      },

      lineHeights: {
        heading: { value: "1.25" },
        paragraph: { value: "1.6" },
        caption: { value: "1.4" },
      },
    },

    textStyles: {
      heading: {
        value: {
          fontFamily: "heading",
          fontSize: "heading",
          fontWeight: "heading",
          lineHeight: "heading",
        },
      },

      paragraph: {
        value: {
          fontFamily: "body",
          fontSize: "paragraph",
          fontWeight: "paragraph",
          lineHeight: "paragraph",
        },
      },

      caption: {
        value: {
          fontFamily: "caption",
          fontSize: "caption",
          fontWeight: "caption",
          lineHeight: "caption",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
