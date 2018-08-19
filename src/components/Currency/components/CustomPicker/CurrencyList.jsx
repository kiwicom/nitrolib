// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import Tooltip from "../../../Tooltip";
import type { Currency } from "records/Currency";
import { themeDefault } from "records/Theme";
import separateList from "services/utils/separateList";
import Flex from "primitives/Flex";
import mq from "styles/mediaQuery";
import CurrencyItem from "./CurrencyItem";
import Code from "./Code";
import Name from "./Name";
import Sign from "./Sign";

const COLUMNS = 4;

const Column = styled.div`
  width: 100%;

  ${mq.gtTablet(css`
    width: ${100 / COLUMNS}%;
  `)};
`;

const Item = styled.div`
  ${mq.gtTablet(css`
    padding-right: 25px;
  `)};
`;

const ItemText = styled.div`
  line-height: 30px;
  padding-left: 5px;
  border-radius: 3px;
  cursor: pointer;
  background: ${({ theme, active }) => (active ? theme.orbit.paletteProductNormal : "transparent")};

  &:hover {
    background: ${({ theme, active }) => theme.orbit[active ? "primary-600" : "grey-100"]};
  }

  ${Code} {
    font-weight: bold;
    color: ${({ theme, active }) => theme.orbit[active ? "white" : "grey-900"]};
  }

  ${Sign} {
    margin-left: 10px;
    color: ${({ theme, active }) => theme.orbit[active ? "white" : "grey-700"]};
  }

  ${Name} {
    margin-left: 10px;
    color: ${({ theme, active }) => theme.orbit[active ? "white" : "inherit"]};
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
          <Item key={item.id}>
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
