// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import { right, left } from "@kiwicom/orbit-components/lib/utils/rtl";
import Text from "@kiwicom/orbit-components/lib/Text";

import type { Currency } from "../../../../records/Currency";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import separateList from "../../services/separateList";
import Flex from "../../../../primitives/Flex";
import mq from "../../../../styles/mq";
import button from "../../../../styles/mixins/button";
import Tooltip from "../../../Tooltip/index";
import CurrencyItem from "../Item/index";
import Code from "../../primitives/Code";
import Name from "../../primitives/Name";
import Sign from "../../primitives/Sign";

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
    padding-${/* sc-custom "right" */ right}: 25px;
  `)};
`;

Item.defaultProps = {
  theme: themeDefault,
};

const ItemText = styled.button`
  ${button};
  display: flex;
  line-height: 30px;
  width: 100%;
  padding-${/* sc-custom "left" */ left}: 5px;
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

  ${Name} {
    margin-${/* sc-custom "left" */ left}: 10px;
    color: ${({ theme, active }: ActiveProps) =>
      theme.orbit[active ? "paletteWhite" : "paletteInkNormal"]};
  }

  ${Sign} {
    margin-${/* sc-custom "left" */ left}: 10px;
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

const List = ({ active, list, onSetCurrency }: Props) => (
  <Flex wrap="wrap">
    {separateList(COLUMNS, list).map((items, i) => (
      <Column key={items.reduce((acc, next) => acc + next.id, "")}>
        {items.map(item => (
          <Item key={item.id} data-test={`Currency-Item-${item.id}`}>
            <Tooltip position={i > 1 ? "left" : "right"} tip={<Tip>{item.name}</Tip>}>
              <Text>
                <ItemText active={item.id === active.id} onClick={() => onSetCurrency(item.id)}>
                  <CurrencyItem item={item} />
                </ItemText>
              </Text>
            </Tooltip>
          </Item>
        ))}
      </Column>
    ))}
  </Flex>
);

export default List;
