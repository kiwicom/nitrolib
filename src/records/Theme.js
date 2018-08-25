// @flow strict
import { defaultTokens, fromPlainObject } from "@kiwicom/orbit-design-tokens";
import type { Tokens } from "@kiwicom/orbit-design-tokens";

import type { Brand } from "./Brand";

export type Theme = {|
  orbit: Tokens,
|};

export type ThemeProps = {| theme: Theme |};

export const themeDefault: Theme = { orbit: defaultTokens };

export const getBrandTheme = (brand: Brand): Theme => ({
  orbit: fromPlainObject(brand.theme.palette),
});
