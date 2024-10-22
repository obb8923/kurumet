import type { Preview } from "@storybook/react";
import '../src/app/globals.css'; // 테일윈드 적용을 위함

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
