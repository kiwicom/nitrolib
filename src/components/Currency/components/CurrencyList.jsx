// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import type { Currency } from "../../../records/Currency";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import separateList from "../../../services/utils/separateList";
import Flex from "../../../primitives/Flex";
import mq from "../../../styles/mq";
import * as rtl from "../../../styles/rtl";
import Tooltip from "../../Tooltip";
import CurrencyItem from "./CurrencyItem";
import Code from "./Code";
import Name from "./Name";
import Sign from "./Sign";

type ActiveProps = {|
  ...ThemeProps,
  active: boolean,
|};

const COLUMNS = 4;

const Column = styled.div`
  width: 100%;

  ${mq.gtTablet(css`
    width: ${100 / COLUMNS}%;
  `)};
`;

const Item = styled.div`
  ${mq.gtTablet(css`
    padding-${rtl.right}: 25px;
  `)};
`;

Item.defaultProps = {
  theme: themeDefault,
};

const ItemText = styled.div`
  display: flex;
  line-height: 30px;
  padding-${rtl.left}: 5px;
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  cursor: pointer;
  background: ${({ theme, active }: ActiveProps) =>
    active ? theme.orbit.paletteProductNormal : "transparent"};

  &:hover {
    background: ${({ theme, active }: ActiveProps) =>
      theme.orbit[active ? "paletteProductNormal" : "paletteCloudNormal"]};
  }

  ${Code} {
    font-weight: bold;
    color: ${({ theme, active }: ActiveProps) =>
      theme.orbit[active ? "paletteWhite" : "paletteInkNormal"]};
  }

  ${Sign} {
    margin-${rtl.left}: 10px;
    color: ${({ theme, active }: ActiveProps) =>
      theme.orbit[active ? "paletteWhite" : "paletteInkNormal"]};
  }

  ${Name} {
    margin-${rtl.left}: 10px;
    color: ${({ theme, active }: ActiveProps) =>
      theme.orbit[active ? "paletteWhite" : "paletteInkNormal"]};
  }

  ${mq.gtTablet(css`
    ${Name} {
      display: none;
    }
  `)};
`;

ItemText.defaultProps = {
  theme: themeDefault,
};

const Tip = styled.span`
  white-space: nowrap;
`;

type Props = {|
  active: Currency,
  list: Currency[],
  onSetCurrency: (code: string) => void,
|};

const CurrencyList = ({ active, list, onSetCurrency }: Props) => (
  <Flex wrap="wrap">
    {separateList(COLUMNS, list).map((items, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Column key={i}>
        {items.map(item => (
          <Item key={item.id} data-test={`CurrencySwitcher-Item-${item.id}`}>
            <Tooltip position={i > 1 ? "left" : "right"} tip={<Tip>{item.name}</Tip>}>
              <ItemText active={item.id === active.id} onClick={() => onSetCurrency(item.id)}>
                <CurrencyItem item={item} />
              </ItemText>
            </Tooltip>
          </Item>
        ))}
      </Column>
    ))}
  </Flex>
);

export default CurrencyList;
