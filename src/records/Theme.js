// @flow strict
import { defaultTokens, fromPlainObject } from "@kiwicom/orbit-design-tokens";
import type { Tokens } from "@kiwicom/orbit-design-tokens";

import type { Brand } from "./Brand";

export type Theme = {|
  orbit: Tokens,
  rtl: boolean,
|};

export type ThemeProps = {| theme: Theme |};

export const themeDefault: Theme = {
  orbit: defaultTokens,
  rtl: false,
};

export const getBrandTheme = (brand: Brand, rtl: boolean = false): Theme => ({
  orbit: fromPlainObject(brand.theme.palette),
  rtl,
});
