// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import mq from "../../styles/mq";

type Props = {|
  children: React.Node | React.Node[],
  // defaulted
  display: "block" | "inline" | "inline-block" | "flex",
|};

const Wrapper = styled.div`
  display: ${({ display }: Props) => display};

  ${mq.gtTablet(css`
    display: none;
  `)};
`;

const Mobile = ({ display, children }: Props) => <Wrapper display={display}>{children}</Wrapper>;

Mobile.defaultProps = {
  display: "block",
};

export default Mobile;
