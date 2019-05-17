import { configure, addDecorator, addParameters } from '@storybook/react';
import 'loki/configure-react';
import { withInfo } from "@storybook/addon-info";

// automatically import all files ending in *.stories.jsx

const req = require.context('../stories', true, /.stories.jsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
