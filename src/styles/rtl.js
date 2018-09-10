// @flow strict
import type { ThemeProps } from "../records/Theme";

const ltrOrRtl: <T1, T2>(valueLtr: T1, valueRtl: T2) => (themeProps: ThemeProps) => T1 | T2 = (
  valueLtr,
  valueRtl,
) => ({ theme }) => (theme.rtl ? valueRtl : valueLtr);

export const box: (ltrValue: string) => (themeProps: ThemeProps) => string = ltrValue => ({
  theme,
}) => {
  if (!theme.rtl) {
    return ltrValue;
  }

  const parts = ltrValue.split(" ");

  return parts.length === 4 ? [parts[0], parts[3], parts[2], parts[1]].join(" ") : ltrValue;
};

export const hOffset: (ltrValue: number) => (themeProps: ThemeProps) => number = ltrValue => ({
  theme,
}) => (theme.rtl ? -ltrValue : ltrValue);

export const left = ltrOrRtl<"left", "right">("left", "right");
export const right = ltrOrRtl<"right", "left">("right", "left");