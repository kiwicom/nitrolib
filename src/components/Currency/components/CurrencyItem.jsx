// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import Text from "@kiwicom/orbit-components/lib/Text";

import { getCode, getSymbol } from "../../../records/Currency";
import type { Currency } from "../../../records/Currency";
import mq from "../../../styles/mq";
import Code from "./Code";
import Sign from "./Sign";
import Name from "./Name";

const NameSeparator = styled.span`
  margin: 0 5px;

  ${mq.gtTablet(css`
    display: none;
  `)};
`;

type Props = {|
  item: Currency,
|};

const CurrencyItem = ({ item }: Props) => (
  <Text>
    <Code>{getCode(item.id)}</Code>
    <Sign>{getSymbol(item.format)}</Sign>
    <NameSeparator>-</NameSeparator>
    <Name>{item.name}</Name>
  </Text>
);

export default CurrencyItem;
