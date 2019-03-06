import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from "@storybook/addon-info";
import { create } from '@storybook/theming';


// automatically import all files ending in *.stories.jsx
const theme = create({
  base: 'light',
  colorPrimary: '#00a991',
  colorSecondary: '#bac7d5',
  fontBase: '"Roboto", -apple-system, ".SFNSText-Regular", "San Francisco", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
});

addParameters({ options: { theme } });

const req = require.context('../stories', true, /.stories.jsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
