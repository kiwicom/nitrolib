// @flow strict
import * as React from "react";
import styled from "styled-components";
import * as R from "ramda";

import Flex from "client/primitives/Flex";
import Tooltip from "client/components/Tooltip";
import separateList from "client/services/utils/separateList";
import type { Currencies, Currency } from "client/records/Currency";
import { brandDefault } from "client/records/Brand";
import { BORDER_RADIUS } from "client/consts/layout";
import mq from "client/services/utils/mediaQuery";
import CurrencyItem, { CLASS_CODE, CLASS_SIGN, CLASS_NAME } from "./CurrencyItem";

type Props = {|
  // eslint-disable-next-line react/no-unused-prop-types
  active: Currency,
  currencies: Currencies,
  // eslint-disable-next-line react/no-unused-prop-types
  setCurrency: string => void,
|};

const COLUMNS = 4;

const Column = styled.div`
  width: 100%;

  ${mq.gtTablet`
    width: ${100 / COLUMNS}%;
  `};
`;

const Item = styled.div`
  ${mq.gtTablet`
    padding-right: 25px;
  `};
`;

const ItemText = styled.div`
  line-height: 30px;
  padding-left: 5px;
  border-radius: ${BORDER_RADIUS}px;
  cursor: pointer;
  background: ${props => (props.active ? props.theme.colors["primary-600"] : "transparent")};

  &:hover {
    background: ${props => props.theme.colors[props.active ? "primary-600" : "grey-100"]};
  }

  .${CLASS_CODE} {
    font-weight: bold;
    color: ${props => props.theme.colors[props.active ? "white" : "grey-900"]};
  }

  .${CLASS_SIGN} {
    margin-left: 10px;
    color: ${props => props.theme.colors[props.active ? "white" : "grey-700"]};
  }

  .${CLASS_NAME} {
    margin-left: 10px;
    color: ${props => props.theme.colors[props.active ? "white" : "inherit"]};
  }

  ${mq.gtTablet`
    .${CLASS_NAME} {
      display: none;
    }
  `};
`;

ItemText.defaultProps = {
  theme: brandDefault.theme,
};

const Tip = styled.span`
  white-space: nowrap;
`;

const SeparatorName = styled.span`
  margin: 0 5px;

  ${mq.gtTablet`
    display: none;
  `};
`;

const CurrencyList = (props: Props) => (
  <Flex wrap="wrap">
    {separateList(COLUMNS, R.values(props.currencies)).map((columnItems, columnIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <Column key={columnIndex}>
        {columnItems.map(item => (
          <Item key={item.id}>
            <Tooltip position={columnIndex > 1 ? "left" : "right"} tip={<Tip>{item.name}</Tip>}>
              <ItemText
                active={item.id === props.active.id}
                onClick={() => props.setCurrency(item.id)}
              >
                <CurrencyItem
                  currency={item}
                  showName
                  separatorName={<SeparatorName>-</SeparatorName>}
                />
              </ItemText>
            </Tooltip>
          </Item>
        ))}
      </Column>
    ))}
  </Flex>
);

export default CurrencyList;
