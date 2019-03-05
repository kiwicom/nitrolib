// @flow strict

import * as React from "react";
import styled, { css } from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Loading from "@kiwicom/orbit-components/lib/icons/Loading";

import Translate from "../../../../../Translate";
import Price from "../../../../../Price";
import { themeDefault } from "../../../../../../records/Theme";
import type { PriceBreakdown as PriceBreakdownType } from "../../../../records/PriceBreakdown";

type Props = {|
  priceBreakdown: PriceBreakdownType,
  isCalculatingPrice?: boolean,
|};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.orbit && theme.orbit.spaceXXSmall};
`;

Item.defaultProps = {
  theme: themeDefault,
};

const Total = styled(Item)`
  margin-top: ${({ theme }) => theme.orbit.spaceMedium};
  margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};

  :last-child {
    margin-bottom: 0;
  }
`;

Total.defaultProps = {
  theme: themeDefault,
};

// ExtraLarge is not in `Text` component from Orbit and
// `Heading` component is not able to render to `div`
const ExtraLarge = styled.span`
  ${({ theme: { orbit } }) => css`
    font-size: ${orbit.fontSizeHeadingTitle2};
    font-weight: ${orbit.fontWeightHeadingTitle2};
    line-height: ${orbit.lineHeightHeading};
  `};
`;

ExtraLarge.defaultProps = {
  theme: themeDefault,
};

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};
`;

LoaderWrapper.defaultProps = {
  theme: themeDefault,
};

const IconWrapper = styled.div`
  margin-right: ${({ theme }) => theme.orbit.spaceSmall};
`;

IconWrapper.defaultProps = {
  theme: themeDefault,
};

const PriceBreakdown = ({
  isCalculatingPrice,
  priceBreakdown: { packagePrice, taxes, fees, totalPrice },
}: Props) =>
  isCalculatingPrice ? (
    <LoaderWrapper>
      <IconWrapper>
        <Loading size="small" color="secondary" />
      </IconWrapper>
      <Text size="large" weight="bold">
        <Translate t="holidays.detail.price_breakdown.calculating_price" />
      </Text>
    </LoaderWrapper>
  ) : (
    <>
      <Heading element="h4" type="title3" spaceAfter="medium">
        <Translate t="holidays.detail.price_breakdown" />
      </Heading>
      <Item>
        <Text element="div">
          <Translate t="holidays.detail.your_package" />
        </Text>
        <Text element="div" align="right">
          <Price value={packagePrice.amount} />
        </Text>
      </Item>
      <Item>
        <Text element="div">
          <Translate t="holidays.price_breakdown.taxes" />
        </Text>
        <Text element="div" align="right">
          <Price value={taxes.amount} />
        </Text>
      </Item>
      <Item>
        <Text element="div">
          <Translate t="holidays.price_breakdown.fees" />
        </Text>
        <Text element="div" align="right">
          <Price value={fees.amount} />
        </Text>
      </Item>
      <Total>
        <Text element="div">
          <ExtraLarge>
            <Translate t="holidays.price_breakdown.total" />
          </ExtraLarge>
        </Text>
        <Text element="div" align="right">
          <ExtraLarge>
            <Price value={totalPrice.amount} />
          </ExtraLarge>
        </Text>
      </Total>
    </>
  );

export default PriceBreakdown;
