// @flow
import styled from "styled-components";
import * as React from "react";
import type { ReactComponentFunctional } from "styled-components";

import { themeDefault } from "../../../records/Theme";
import Button from "./Button";
import type { ThemeProps } from "../../../records/Theme";
import type { Bg, Color } from "./Button";

type Props = {|
  href?: string,
  children: React.Node | React.Node[],
  bold?: boolean,
  block?: boolean,
  color?: Color,
  padding?: string,
  background?: Bg,
  marginLeft?: number,
  marginRight?: number,
  fontSize?: number,
  disabled?: boolean,
  x?: string,
  y?: string,
  direction?: string,
|};

// $FlowExpected: TODO describe
const ButtonLink: ReactComponentFunctional<Props, ThemeProps> = styled(Button)``;

ButtonLink.defaultProps = {
  as: "a",
  theme: themeDefault,
};

export default ButtonLink;
