import '../src/assets/css/custom-plugins.css';
import '../src/assets/css/globals.css';
// base css file
import '../src/assets/css/scrollbar.css';
import '../src/assets/css/swiper-carousel.css';
import '../src/components/ui/rangeSlider/style.css';
import '../src/styles/tailwind.css';
import '@components/ui/rangeSlider/style.css';
import * as NextImage from 'next/image';
import 'react-toastify/dist/ReactToastify.css';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};
