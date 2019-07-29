import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { themeDefault } from "../../records/Theme";

type Props = {
  children: React.ReactNode | React.ReactNode[],
  // defaulted
  display: "block" | "inline" | "inline-block" | "flex",
};

const Wrapper = styled.div`
  display: none;

  ${mq.tablet(css`
    display: ${({ display }: Props) => display};
  `)};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const Desktop = ({ display, children }: Props) => <Wrapper display={display}>{children}</Wrapper>;

Desktop.defaultProps = {
  display: "block",
};

export default Desktop;
