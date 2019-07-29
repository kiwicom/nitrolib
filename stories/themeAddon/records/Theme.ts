export type StoryBookTheme = {
  base: "light" | "dark",

  colorPrimary?: string,
  colorSecondary?: string,

  // UI
  appBg?: string,
  appContentBg?: string,
  appBorderColor?: string,
  appBorderRadius?: number,

  // Typography
  fontBase?: string,
  fontCode?: string,

  // Text colors
  textColor?: string,
  textInverseColor?: string,

  // Toolbar default and active colors
  barTextColor?: string,
  barSelectedColor?: string,
  barBg?: string,

  // Form colors
  inputBg?: string,
  inputBorder?: string,
  inputTextColor?: string,
  inputBorderRadius?: number,

  brandTitle?: string,
  brandUrl?: string,
  brandImage?: string,
};

export type ThemeNames = "default" | "nitro" | "dracula" | "blues";

export type Themes = { [key: ThemeNames]: StoryBookTheme };
