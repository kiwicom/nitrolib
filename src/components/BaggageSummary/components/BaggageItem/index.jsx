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

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: flex-start;
  align-content: center;

  ${mq.ltBigMobile(css`
    display: flex;
  `)};

  > * {
    margin-right: ${({ theme }): ThemeProps => theme.orbit.spaceXSmall};
  }
`;

TitleWrapper.defaultProps = {
  theme: themeDefault,
};

type BaggageSizeTextProps = ThemeProps & {
  isMobile: boolean,
};

const BaggageSizeText = styled.p`
  display: ${({ isMobile }: BaggageSizeTextProps) => (isMobile ? "none" : "block")};
  color: ${({ theme }): ThemeProps => theme.orbit.colorTextSecondary};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-family: ${({ theme }): ThemeProps => theme.orbit.fontFamily};
  margin: 0;

  ${mq.ltBigMobile(css`
    display: ${({ isMobile }: BaggageSizeTextProps) => (isMobile ? "block" : "none")};
  `)};
`;

BaggageSizeText.defaultProps = {
  theme: themeDefault,
  isMobile: false,
};

const Title = styled.span`
  line-height: 24px;
`;

const BaggageInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${mq.ltBigMobile(css`
    justify-content: flex-end;
    width: 50%;
  `)};
`;

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

  const getPassengersText = passengersArr =>
    passengersArr.map(p => `${p.firstName[0]} ${p.lastName}`).join(", ");

  return (
    <Stack shrink align="center">
      <Stack shrink spacing="condensed">
        {icon}
        <TitleWrapper>
          <Text>
            <Title>
              <Text element="span" weight="bold">
                {`${amount}x `}
              </Text>
              {category === "holdBag" && `${restrictions.weight}kg  `}
              {getTextFromCategory(category)}
              <BaggageSizeText isMobile>{getBaggageSize(restrictions)}</BaggageSizeText>
            </Title>
          </Text>
        </TitleWrapper>
        <BaggageSizeText>{getBaggageSize(restrictions)}</BaggageSizeText>
      </Stack>
      <BaggageInfoWrapper>
        <div>
          <AccountCircle size="small" color="secondary" />
          <Text element="span" type="secondary">
            {getPassengersText(passengers)}
          </Text>
        </div>
      </BaggageInfoWrapper>
    </Stack>
  );
};

export default BaggageItem;
