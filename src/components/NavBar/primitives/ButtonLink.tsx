
import styled from "styled-components";
import * as React from "react";
import { ReactComponentFunctional } from "styled-components";

import { themeDefault } from "../../../records/Theme";
import Button from "./Button";
import { ThemeProps } from "../../../records/Theme";
import { Bg, Color } from "./Button";

type Props = {
  href?: string,
  children: React.ReactNode | React.ReactNode[],
  bold?: boolean,
  block?: boolean,
  color?: Color,
  background?: Bg,
  fontSize?: number,
  className?: string,
  disabled?: boolean,
};

// $FlowExpected: TODO describe
const ButtonLink: ReactComponentFunctional<Props, ThemeProps> = styled(Button)``;

ButtonLink.defaultProps = {
  as: "a",
  theme: themeDefault,
};

export default ButtonLink;
