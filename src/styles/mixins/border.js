// @flow strict
import { css } from "styled-components";

import type { ThemeProps } from "../../records/Brand";

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
  base: "neutral-200",
  success: "primary-600",
  hint: "primary-600",
  error: "danger-700",
};

const borderHoverMixin = css`
  &:hover {
    border-color: ${({ theme }: ThemeProps) => theme.colors["neutral-700"]};
  }
`;

type StateProps = ThemeProps & {
  state: "base" | "success" | "error" | "hint",
};

const borderMixin = css`
  border: ${border.size}px solid
    ${({ theme, state }): StateProps => theme.colors[stateToColor[state]]};
  border-radius: ${border.radius}px;
  ${({ state }: StateProps) => state === "base" && borderHoverMixin};
`;

export default borderMixin;
