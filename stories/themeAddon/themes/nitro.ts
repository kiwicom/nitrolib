import { create } from "@storybook/theming";

const nitroDefault = create({
  base: "dark",
  colorPrimary: "#ea5455",
  colorSecondary: "#ea5455",
  // bgs
  appBg: "#343434",
  appContentBg: "#343434",
  appBorderColor: "#fde9c9",
  barBg: "#343434",
  // text colors
  barTextColor: "#f8f8f2",
  textColor: "#f8f8f2",
  barSelectedColor: "#ea5455",
  // input
  inputBg: "#2d4059",
  inputBordeRadius: 0,
  // brand
  brandTitle: "Nitrolib",
});

export default nitroDefault;
