// @flow
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import styled, { css } from "styled-components";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";

import mq from "../../../../styles/mq";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import type { BaggageSubCategory, Restrictions } from "../../../../records/Baggage";
import { getTextFromCategory } from "../../../../services/baggage/utils";

const BaggWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: flex-start;
  align-items: center;

  ${mq.ltBigMobile(css`
    flex-direction: column;
    align-items: flex-start;
  `)};

  > * {
    margin-right: ${({ theme }): ThemeProps => theme.orbit.spaceXSmall};
  }
`;

BaggWrapper.defaultProps = {
  theme: themeDefault,
};

const PassengersWrapper = styled.div`
  display: flex;
  width: 100%;
  svg {
    margin-right: ${({ theme }): ThemeProps => theme.orbit.spaceXSmall};
  }
`;
PassengersWrapper.defaultProps = {
  theme: themeDefault,
};

type Props = {
  passengers: Array<{ lastName: string, firstName: string, id: number }>,
  icon: React$Node,
  restrictions: Restrictions,
  category: BaggageSubCategory,
  amount: number,
};

const BaggageItem = ({ passengers, category, amount, icon, restrictions }: Props) => {
  const getBaggageSize = ({ height, length, weight, width }) =>
    `${length} x ${width} x ${height} cm, ${weight} kg`;

  const getPassengerNames = passengersArr =>
    passengersArr.map(p => `${p.firstName[0]}. ${p.lastName}`).join(", ");

  return (
    <Stack shrink>
      <Stack shrink spacing="condensed" align="center">
        {icon}
        <BaggWrapper>
          <Text element="span">
            {`${amount}x `}
            {category === "holdBag" && `${restrictions.weight}kg  `}
            {getTextFromCategory(category)}
          </Text>
          <Text element="span" type="secondary" size="small">
            {getBaggageSize(restrictions)}
          </Text>
        </BaggWrapper>
        <div />
      </Stack>

      <PassengersWrapper>
        <AccountCircle size="small" color="secondary" />
        <Text element="span" type="secondary">
          {getPassengerNames(passengers)}
        </Text>
      </PassengersWrapper>
    </Stack>
  );
};

export default BaggageItem;
