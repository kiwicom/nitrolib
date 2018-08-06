// @flow strict
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import type { Tokens } from "@kiwicom/orbit-design-tokens";

// import type { Brand } from "./Brand";

export type Theme = {|
  orbit: Tokens,
|};

export type ThemeProps = { theme: Theme };

export const themeDefault: Theme = { orbit: defaultTokens };

export function getBrandTheme(/* brand: Brand */): Theme {
  return themeDefault; // TODO map from brand
}
