// eslint-disable-next-line
import { create } from "@storybook/theming";
import { StoryBookTheme } from "../records/Theme";

const dracula: StoryBookTheme = create({
  base: "dark",
  colorPrimary: "#44475a",
  colorSecondary: "#6272a4",
  // bgs
  appBg: "#282a36",
  appContentBg: "#44475a",
  appBorderColor: "#6272a4",
  barBg: "#282a36",
  // text colors
  barTextColor: "#f8f8f2",
  textColor: "#f8f8f2",
  barSelectedColor: "#6272a4",
  // input
  inputBg: "#282a36",
  inputBordeRadius: 0,
  // brand
  brandTitle: "Nitrolib",
});

export default dracula;
