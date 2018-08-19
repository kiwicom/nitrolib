// @flow strict
import { css } from "styled-components";

import type { ThemeProps } from "records/Theme";

import { border } from "..";

type Props = {
  error: boolean,
  active: boolean,
  visited: boolean,
  hint: boolean,
};

export function getBorderState({ error, visited, hint }: Props) {
  if (error && visited) {
    return "error";
  }

  if (hint) {
    return "hint";
  }

  if (visited) {
    return "success";
  }

  return "base";
}

const stateToColor = {
  base: "paletteCloudNormalHover",
  success: "paletteProductNormal",
  hint: "paletteProductNormal",
  error: "paletteRedNormal",
};

const borderHoverMixin = css`
  &:hover {
    border-color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  }
`;

type StateProps = ThemeProps & {
  state: "base" | "success" | "error" | "hint",
};

const borderMixin = css`
  border: ${border.size}px solid
    ${({ theme, state }): StateProps => theme.orbit[stateToColor[state]]};
  border-radius: ${border.radius}px;
  ${({ state }: StateProps) => state === "base" && borderHoverMixin};
`;

export default borderMixin;
