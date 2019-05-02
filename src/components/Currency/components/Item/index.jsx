// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { getCode, getSymbol } from "../../../../records/Currency";
import type { Currency } from "../../../../records/Currency";
import Code from "../../primitives/Code";
import Sign from "../../primitives/Sign";
import Name from "../../primitives/Name";

const NameSeparator = styled.span`
  margin: 0 5px;

  ${mq.largeMobile(css`
    display: none;
  `)};
`;

type Props = {|
  item: Currency,
|};

const Item = ({ item }: Props) => (
  <>
    <Code>{getCode(item.id)}</Code>
    <Sign>{getSymbol(item.format.format)}</Sign>
    <NameSeparator>-</NameSeparator>
    <Name>{item.name}</Name>
  </>
);

export default Item;
