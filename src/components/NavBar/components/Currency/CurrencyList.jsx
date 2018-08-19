// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import { graphql, createFragmentContainer } from "react-relay";

import Tooltip from "components/Tooltip";
import type { Currencies, Currency } from "records/Currency";
import { themeDefault } from "records/Theme";
import separateList from "services/utils/separateList";
import Flex from "primitives/Flex";
import mq from "styles/mediaQuery";
import CurrencyItem from "./CurrencyItem";
import Code from "./Code";
import Name from "./Name";
import Sign from "./Sign";
import type { CurrencyList_list } from "./__generated__/CurrencyList_list.graphql";

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
  // eslint-disable-next-line react/no-unused-prop-types
  active: Currency,
  available: Currencies,
  list: CurrencyList_list,
  // eslint-disable-next-line react/no-unused-prop-types
  onSetCurrency: (code: string) => void,
|};

const CurrencyList = ({ active, available, list, onSetCurrency }: Props) => (
  <Flex wrap="wrap">
    {separateList(
      COLUMNS,
      // FIXME filter directly in GraphQL
      (list.edges &&
        list.edges
          .map(edge => edge && edge.node)
          .filter(Boolean)
          .filter(node => available[String(node.code)])) ||
        [],
    ).map((items, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Column key={i}>
        {items.map(item => (
          <Item key={item.code}>
            <Tooltip position={i > 1 ? "left" : "right"} tip={<Tip>{item.name}</Tip>}>
              <ItemText
                active={item.code === active.id}
                onClick={() => onSetCurrency(item.code || "")}
              >
                {/* $FlowIssue */}
                <CurrencyItem item={item} />
              </ItemText>
            </Tooltip>
          </Item>
        ))}
      </Column>
    ))}
  </Flex>
);

export const CurrencyListUnwrapped = CurrencyList;

export default createFragmentContainer(
  CurrencyList,
  graphql`
    fragment CurrencyList_list on CurrencyDetailConnection {
      edges {
        node {
          code
          name
          ...CurrencyItem_item
        }
      }
    }
  `,
);
