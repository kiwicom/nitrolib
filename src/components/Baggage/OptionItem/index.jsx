// @flow
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import styled, { css } from "styled-components";

import mq from "../../../styles/mq";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import type { Price, Restrictions } from "../../../records/Baggage";

type Props = {|
  isHoldBag: boolean,
  amount: number,
  restrictions: Restrictions,
  firstItem: boolean,
  price: Price,
  categoryIcon: React$Element<any>,
  categoryName: React$Node,
|};

type BaggageSizeTextProps = ThemeProps & {
  isMobile: boolean,
};

const BaggageSizeText = styled.p`
  display: ${({ isMobile }: BaggageSizeTextProps) => (isMobile ? "none" : "block")};
  color: ${({ theme }): ThemeProps => theme.orbit.colorTextSecondary};
  font-size: ${({ theme, isMobile }: BaggageSizeTextProps) =>
    isMobile ? theme.orbit.fontSizeTextSmall : theme.orbit.fontSizeTextNormal};
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

const OptionItem = ({
  firstItem,
  amount,
  restrictions,
  isHoldBag,
  price,
  categoryIcon,
  categoryName,
}: Props) => {
  const getBaggageSize = ({ height, length, weight, width }) =>
    `${length} x ${width} x ${height} cm, ${weight} kg`;

  return (
    <Stack shrink align="center">
      <Stack shrink spacing="condensed">
        {categoryIcon}
        <TitleWrapper>
          <Text>
            <Title>
              {amount > 1 && (
                <Text element="span" weight="bold">
                  {`${amount}x `}
                </Text>
              )}
              {isHoldBag && `${restrictions.weight}kg`} {categoryName}
            </Title>
          </Text>
          <BaggageSizeText isMobile>{getBaggageSize(restrictions)}</BaggageSizeText>
        </TitleWrapper>
      </Stack>
      <BaggageInfoWrapper>
        <BaggageSizeText>{getBaggageSize(restrictions)}</BaggageSizeText>
        {firstItem ? (
          <Text element="span" weight="bold">{`${price.amount} ${price.currency}`}</Text>
        ) : (
          <span />
        )}
      </BaggageInfoWrapper>
    </Stack>
  );
};

export default OptionItem;
