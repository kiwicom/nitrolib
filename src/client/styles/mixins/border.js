// @flow strict
import { css } from "styled-components";

import { border } from "client/styles";

type Props = {
  error: boolean,
  active: boolean,
  visited: boolean,
};

export function getBorderState(props: Props) {
  if (props.error && props.visited) {
    return "error";
  }

  if (props.visited) {
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
    border-color: ${props => props.theme.colors["neutral-700"]};
  }
`;

const borderMixin = css`
  border: ${border.size}px solid ${props => props.theme.colors[stateToColor[props.state]]};
  border-radius: ${border.radius}px;
  ${props => props.state === "base" && borderHoverMixin};
`;

export default borderMixin;
