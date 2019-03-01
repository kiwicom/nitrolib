// @flow strict
import * as React from "react";
import styled from "styled-components";

import { getCode, getSymbol } from "../../../../records/Currency";
import type { Currency } from "../../../../records/Currency";
import Code from "../../primitives/Code";
import Sign from "../../primitives/Sign";
import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";

type InvertedProps = {|
  ...ThemeProps,
  inverted: ?boolean,
|};

const Separator = styled.span`
  margin: 0 3px;
`;

const Wrapper = styled.div`
  display: flex;
  color: ${({ theme, inverted }: InvertedProps) =>
    inverted ? theme.orbit.paletteWhite : theme.orbit.paletteInkNormal};

  &:hover {
    color: ${({ theme, inverted }: InvertedProps) =>
      inverted ? theme.orbit.paletteWhiteHover : theme.orbit.paletteProductNormalHover};
  }
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  current: Currency,
  inverted?: boolean,
|};

const Current = ({ current, inverted }: Props) => (
  <Wrapper inverted={inverted} data-test="Currency-Open">
    <Code>{getCode(current.id)}</Code>
    <Separator>-</Separator>
    <Sign>{getSymbol(current.format)}</Sign>
  </Wrapper>
);

export default Current;
