// @flow strict
import * as React from "react";
import styled, { css, ThemeConsumer } from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import type { TileItem, OrderStatusType } from "../../../../records/Baggage";
import getIconFromCategory from "../../../../services/baggage/getIconFromCategory";
import getTextFromCategory from "../../../../services/baggage/getTextFromCategory";
import getBaggageSize from "../../../../services/baggage/getBaggageSize";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

const BaggageRestrictionsWrapper = styled.div`
  display: none;

  ${mq.mediumMobile(css`
    display: flex;
    width: 80%;
  `)};
  ${mq.largeMobile(css`
    display: flex;
    width: 100%;
  `)};
`;

BaggageRestrictionsWrapper.defaultProps = {
  theme: themeDefault,
};

type BaggageRestrictionsProps = {|
  ...ThemeProps,
  isMobile: boolean,
|};

const BaggageRestrictions = styled.span`
  display: ${({ isMobile }: BaggageRestrictionsProps) => (isMobile ? "inline-block" : "none")};
  padding-left: ${({ isMobile }: BaggageRestrictionsProps) => (isMobile ? "24px" : "0px")};
  color: ${({ theme }): ThemeProps => theme.orbit.colorTextSecondary};
  font-size: ${({ theme, isMobile }: BaggageRestrictionsProps) =>
    isMobile ? theme.orbit.fontSizeTextNormal : "inherit"};
  font-family: ${({ theme }): ThemeProps => theme.orbit.fontFamily};

  ${mq.mediumMobile(css`
    display: ${({ isMobile }: BaggageRestrictionsProps) => (isMobile ? "none" : "block")};
  `)};
`;

BaggageRestrictions.defaultProps = {
  theme: themeDefault,
  isMobile: false,
};

type Props = {
  ...TileItem,
  isCurrent?: boolean,
  orderStatus: ?OrderStatusType,
};

const BaggageItem = ({ category, restrictions, isCurrent, orderStatus }: Props) => {
  const textWeight =
    isCurrent || orderStatus === null || orderStatus === "notAvailable" ? "normal" : "bold";
  return (
    <ThemeConsumer>
      {({ rtl }) => (
        <Stack flex direction="row" align="center" dataTest="CustomerBaggageTile-BaggageItem">
          <Stack shrink spacing="tight" direction="column">
            <Stack grow flex align="center" spacing="condensed">
              {getIconFromCategory(category, "small", "primary")}
              <Text element="span" weight={textWeight}>
                {typeof restrictions.weight === "number" && `${restrictions.weight}kg `}
                {getTextFromCategory(category)}
              </Text>
            </Stack>
            <BaggageRestrictions isMobile>{getBaggageSize(restrictions, rtl)}</BaggageRestrictions>
          </Stack>
          <BaggageRestrictionsWrapper shrink>
            <BaggageRestrictions>{getBaggageSize(restrictions, rtl)}</BaggageRestrictions>
          </BaggageRestrictionsWrapper>
        </Stack>
      )}
    </ThemeConsumer>
  );
};

export default BaggageItem;
