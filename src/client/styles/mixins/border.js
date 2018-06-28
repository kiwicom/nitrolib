// @flow strict
import { css } from "styled-components";

import { border } from "client/styles";
import type { ThemeProps } from "client/public/records/Brand";

type Props = {
  error: boolean,
  active: boolean,
  visited: boolean,
};

export function getBorderState({ error, visited }: Props) {
  if (error && visited) {
    return "error";
  }

  if (visited) {
    return "success";
  }

  return "base";
}

const stateToColor = {
  base: "neutral-200",
  success: "primary-600",
  error: "danger-700",
};

const borderHoverMixin = css`
  &:hover {
    border-color: ${({ theme }: ThemeProps) => theme.colors["neutral-700"]};
  }
`;

type StateProps = ThemeProps & {
  state: "base" | "success" | "error",
};

const borderMixin = css`
  border: ${border.size}px solid
    ${({ theme, state }): StateProps => theme.colors[stateToColor[state]]};
  border-radius: ${border.radius}px;
  ${({ state }: StateProps) => state === "base" && borderHoverMixin};
`;

export default borderMixin;
