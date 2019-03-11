// @flow strict
import defaultTokens, { type Theme } from "@kiwicom/orbit-components/lib/defaultTokens";
import fromPlainObject from "@kiwicom/orbit-components/lib/fromPlainObject";

import type { Brand } from "./Brand";

export type ThemeProps = {| theme: Theme |};

export const themeDefault: Theme = defaultTokens;

export const getBrandTheme = (brand: Brand, rtl: boolean = false): Theme => ({
  orbit: fromPlainObject(brand.theme.palette),
  rtl,
});
