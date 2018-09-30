// @flow strict
import type { ThemeProps } from "../records/Theme";

type LtrOrRtl = <T1, T2>(valueLtr: T1, valueRtl: T2) => (themeProps: ThemeProps) => T1 | T2;

const ltrOrRtl: LtrOrRtl = (valueLtr, valueRtl) => ({ theme }) => (theme.rtl ? valueRtl : valueLtr);

type Box = (
  top: number,
  right: number,
  bot: number,
  left: number,
) => (themeProps: ThemeProps) => string;

const boxFormat = (top: number, right: number, bot: number, left: number): string =>
  [top, right, bot, left].map(val => `${val}px`).join(" ");

export const box: Box = (top, right, bot, left) => ({ theme }) => {
  if (!theme.rtl) {
    return boxFormat(top, right, bot, left);
  }

  return boxFormat(top, left, bot, right);
};

export const hOffset: (ltrValue: number) => (themeProps: ThemeProps) => number = ltrValue => ({
  theme,
}) => (theme.rtl ? -ltrValue : ltrValue);

export const left = ltrOrRtl("left", "right");
export const right = ltrOrRtl("right", "left");

type Translate3d = (x: string, y: string, z: string) => (themeProps: ThemeProps) => string;

const translate3dFormat = (x: string, y: string, z: string): string =>
  `translate3d(${x}, ${y}, ${z})`;

export const translate3d: Translate3d = (x, y, z) => ({ theme }) => {
  if (!theme.rtl) {
    return translate3dFormat(x, y, z);
  }

  const newX = x[0] === "-" ? x.slice(1) : `-${x}`;
  return translate3dFormat(newX, y, z);
};
