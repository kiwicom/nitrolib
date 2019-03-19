// @flow strict
// eslint-disable-next-line
import light from "@storybook/theming/dist/themes/light";
import type { Themes } from "./records/Theme";
import * as allThemes from "./themes";

const themes: Themes = {
  default: light,
  ...allThemes,
};

export default themes;
