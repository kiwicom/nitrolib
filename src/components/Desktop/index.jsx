// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

type Props = {|
  children: React.Node | React.Node[],
  // defaulted
  display: "block" | "inline" | "inline-block" | "flex",
|};

const Wrapper = styled.div`
  display: none;

  ${mq.tablet(css`
    display: ${({ display }: Props) => display};
  `)};
`;

const Desktop = ({ display, children }: Props) => <Wrapper display={display}>{children}</Wrapper>;

Desktop.defaultProps = {
  display: "block",
};

export default Desktop;
