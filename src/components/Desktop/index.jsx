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
  display: none;

  ${mq.gtTablet(css`
    display: ${({ display }: Props) => display};
  `)};
`;

const Desktop = ({ display, children }: Props) => <Wrapper display={display}>{children}</Wrapper>;

Desktop.defaultProps = {
  display: "block",
};

export default Desktop;
