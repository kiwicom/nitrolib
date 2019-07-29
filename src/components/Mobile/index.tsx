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
  display: ${({ display }: Props) => display};

  ${mq.tablet(css`
    display: none;
  `)};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const Mobile = ({ display, children }: Props) => <Wrapper display={display}>{children}</Wrapper>;

Mobile.defaultProps = {
  display: "block",
};

export default Mobile;
