// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import styled, { css, ThemeConsumer } from "styled-components";
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

type BaggageSizeTextProps = {|
  ...ThemeProps,
  isMobile: boolean,
|};

const BaggageSizeText = styled.p`
  display: ${({ isMobile }: BaggageSizeTextProps) => (isMobile ? "block" : "none")};
  color: ${({ theme }): ThemeProps => theme.orbit.colorTextSecondary};
  line-height: 24px;
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

const Title = styled.p`
  max-width: 120px;
  line-height: 24px;
  margin: 0;
  ${mq.mediumMobile(css`
    max-width: 200px;
  `)};
  ${mq.desktop(css`
    max-width: unset;
  `)};
`;

const CurrentItem = styled.span`
  line-height: 24px;
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
      <Text
        element="span"
        weight="bold"
        type="secondary"
        dataTest="BaggagePicker-OptionItem-Current"
      >
        <Translate t="baggage_modal.select.current" />
      </Text>
    ) : (
      <Text element="span" weight="bold" dataTest="BaggagePicker-OptionItem-Price">
        <Price value={priceValue} />
      </Text>
    );
  return (
    <ThemeConsumer>
      {({ rtl }) => (
        <Stack
          flex
          shrink
          align="start"
          dataTest={`BaggagePicker-OptionItem-${category}`}
          spacing="none"
          mediumMobile={{ spacing: "tight" }}
        >
          <Stack inline spacing="condensed" mediumMobile={{ shrink: true, inline: false }}>
            {getIconFromCategory(category, "medium", "primary")}
            <Stack inline direction="column" spacing="none">
              <Text element="p">
                <Title>
                  {amount > 1 && (
                    <Text element="span" weight="bold">
                      {`${amount}× `}
                    </Text>
                  )}
                  {category === "holdBag" &&
                    typeof restrictions.weight === "number" &&
                    `${restrictions.weight} kg `}
                  {getTextFromCategory(category)}
                </Title>
              </Text>
              <BaggageSizeText isMobile>{getBaggageSize(restrictions, rtl)}</BaggageSizeText>
            </Stack>
          </Stack>
          <Stack
            inline
            justify="end"
            largeMobile={{ justify: "between", shrink: true, basis: "100%" }}
          >
            <BaggageSizeText>{getBaggageSize(restrictions, rtl)}</BaggageSizeText>
            <CurrentItem>
              {isFirstItem && getFirstItemInfo(isCurrentCombination, price.amount)}
            </CurrentItem>
          </Stack>
        </Stack>
      )}
    </ThemeConsumer>
  );
};

export default OptionItem;
