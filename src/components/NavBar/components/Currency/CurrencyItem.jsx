// @flow strict
import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled, { css } from "styled-components";
import idx from "idx";

import { getCode, getSymbol } from "records/Currency";
import mq from "styles/mediaQuery";
import Code from "./Code";
import Sign from "./Sign";
import Name from "./Name";
import type { CurrencyItem_item } from "./__generated__/CurrencyItem_item.graphql";

const NameSeparator = styled.span`
  margin: 0 5px;

  ${mq.gtTablet(css`
    display: none;
  `)};
`;

type Props = {|
  item: CurrencyItem_item,
|};

const CurrencyItem = ({ item }: Props) => (
  <>
    <Code>{getCode(idx(item, _ => _.code) || "")}</Code>
    <Sign>{getSymbol(idx(item, _ => _.format) || "")}</Sign>
    <NameSeparator>-</NameSeparator>
    <Name>{idx(item, _ => _.name)}</Name>
  </>
);

export const CurrencyItemUnwrapped = CurrencyItem;

export default createFragmentContainer(
  CurrencyItem,
  graphql`
    fragment CurrencyItem_item on CurrencyDetail {
      code
      name
      format
    }
  `,
);
