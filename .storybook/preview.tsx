import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from "@storybook/addon-themes";
import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import { themes } from "storybook/theming";
import "../src/globals.css";

const ThemedDocsContainer = (props: DocsContainerProps) => {
  const currentTheme = (props.context as any)?.store?.userGlobals?.globals?.theme;
  return <DocsContainer {...props} theme={currentTheme === "dark" ? themes.dark : themes.light} />;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    },
    docs: {
      container: ThemedDocsContainer,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;