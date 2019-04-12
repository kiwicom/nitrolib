// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import type { Restrictions, BaggageSubCategory } from "../../../../records/Baggage";
import type { PriceType } from "../../../../records/Price";
import getBaggageSize from "../../../../services/baggage/getBaggageSize";
import getTextFromCategory from "../../../../services/baggage/getTextFromCategory";
import getIconFromCategory from "../../../../services/baggage/getIconFromCategory";
import Price from "../../../Price";
import Translate from "../../../Translate";

type Props = {|
  amount: number,
  restrictions: Restrictions,
  isFirstItem: boolean,
  price: PriceType,
  category: BaggageSubCategory,
  isCurrentCombination: boolean,
|};

type BaggageSizeTextProps = {
  ...ThemeProps,
  isMobile: boolean,
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

  > * {
    margin-right: ${({ theme }): ThemeProps => theme.orbit.spaceXSmall};
  }
`;

TitleWrapper.defaultProps = {
  theme: themeDefault,
};

const IconWrapper = styled.div`
  padding-bottom: 4px;
`;

const BaggageSizeText = styled.p`
  display: ${({ isMobile }: BaggageSizeTextProps) => (isMobile ? "block" : "none")};
  color: ${({ theme }): ThemeProps => theme.orbit.colorTextSecondary};
  font-size: ${({ theme, isMobile }: BaggageSizeTextProps) =>
    isMobile ? theme.orbit.fontSizeTextSmall : theme.orbit.fontSizeTextNormal};
  font-family: ${({ theme }): ThemeProps => theme.orbit.fontFamily};
  margin: 0;

  ${mq.largeMobile(css`
    display: ${({ isMobile }: BaggageSizeTextProps) => (isMobile ? "none" : "block")};
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
  justify-content: flex-end;
  width: 50%;
  line-height: 24px;
  ${mq.largeMobile(css`
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `)};
`;

const OptionItem = ({
  isFirstItem,
  amount,
  restrictions,
  category,
  price,
  isCurrentCombination,
}: Props) => {
  const getFirstItemInfo = (isCurrent, priceValue) =>
    isCurrent ? (
      <Text element="span" weight="bold" type="secondary">
        <Translate t="baggage_modal.select.current" />
      </Text>
    ) : (
      <Text element="span" weight="bold">
        <Price value={priceValue} />
      </Text>
    );
  return (
    <Stack shrink align="start" dataTest={`BaggagePicker-OptionItem-${category}`}>
      <Stack shrink spacing="condensed">
        <IconWrapper>{getIconFromCategory(category, "medium", "primary")}</IconWrapper>
        <TitleWrapper>
          <Text>
            <Title>
              {amount > 1 && (
                <Text element="span" weight="bold">
                  {`${amount}× `}
                </Text>
              )}
              {category === "holdBag" && `${restrictions.weight}kg`}{" "}
              {getTextFromCategory(category, x => x.toLowerCase())}
            </Title>
          </Text>
          <BaggageSizeText isMobile>{getBaggageSize(restrictions)}</BaggageSizeText>
        </TitleWrapper>
      </Stack>
      <BaggageInfoWrapper>
        <BaggageSizeText>{getBaggageSize(restrictions)}</BaggageSizeText>
        {isFirstItem && getFirstItemInfo(isCurrentCombination, price.amount)}
      </BaggageInfoWrapper>
    </Stack>
  );
};

export default OptionItem;
