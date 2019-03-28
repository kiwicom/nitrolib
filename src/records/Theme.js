// @flow strict
import defaultTheme, { type Theme } from "@kiwicom/orbit-components/lib/defaultTheme";
import fromPlainObject from "@kiwicom/orbit-components/lib/fromPlainObject";

import type { Brand } from "./Brand";

export type ThemeProps = {| theme: Theme |};

export const themeDefault: Theme = defaultTheme;

export const getBrandTheme = (brand: Brand, rtl: boolean = false): Theme => ({
  orbit: fromPlainObject(brand.theme.palette),
  rtl,
});
