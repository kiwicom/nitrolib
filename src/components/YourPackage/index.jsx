// @flow strict

import * as React from "react";
import styled, { css } from "styled-components";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Button from "@kiwicom/orbit-components/lib/Button";
import ShareIos from "@kiwicom/orbit-components/lib/icons/ShareIos";

import Translate from "../Translate";
import { type TravelDates } from "../TravelInfo/records/TravelDates";
import { type TravelArrangement } from "./records/TravelArrangement";
import { type PriceBreakdown } from "./records/PriceBreakdown";
import { type Hotel } from "./records/Hotel";
import Content from "./components/Content";
import { themeDefault } from "../../records/Theme";

type YourPackageType = {
  travelDates: TravelDates,
  travelArrangement: TravelArrangement,
  hotel: Hotel,
  priceBreakdown: PriceBreakdown,
};

type Props = {|
  search?: boolean,
  isCalculatingPrice?: boolean,
  onBookNowClick?: Function,
  onShareClick?: Function,
  package: YourPackageType,
|};

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${({ theme }) => theme.orbit.heightButtonNormal};
  margin-bottom: 0;
  padding-left: ${({ theme }) => theme.orbit.spaceMedium};
  ${mq.largeMobile(css`
    padding: 0;
    margin-bottom: ${({ theme }) => theme.orbit.spaceSmall};
  `)};
`;

HeadingWrapper.defaultProps = {
  theme: themeDefault,
};

const ContentWrapper = styled.div`
  ${({ theme: { orbit } }) => css`
    background: ${orbit.paletteWhite};
    padding: ${orbit.spaceLarge} ${orbit.spaceMedium};

    ${mq.largeMobile(css`
      padding: ${orbit.spaceLarge};
      border-radius: ${orbit.borderRadiusNormal};
      border-width: ${orbit.borderWidthCard};
      border-style: ${orbit.borderStyleCard};
      border-color: ${orbit.borderColorCard};
      box-shadow: ${orbit.boxShadowElevatedLevel1};
    `)};
  `};
`;

ContentWrapper.defaultProps = {
  theme: themeDefault,
};

const ButtonWrapper = styled.div`
  margin-right: ${({ theme }) => theme.orbit.spaceMedium};
`;

ButtonWrapper.defaultProps = {
  theme: themeDefault,
};

const YourPackage = ({
  package: { hotel, travelDates, travelArrangement, priceBreakdown },
  search,
  isCalculatingPrice,
  onBookNowClick,
  onShareClick,
}: Props) => (
  <>
    <HeadingWrapper>
      <Heading element="h3" type="title2">
        <Translate t="holidays.detail.your_package" />
      </Heading>
      {search && (
        <ButtonWrapper>
          <Button onClick={onShareClick} type="secondary" iconRight={<ShareIos />}>
            <Translate t="holidays.share.button" />
          </Button>
        </ButtonWrapper>
      )}
    </HeadingWrapper>
    <ContentWrapper>
      <Content
        priceBreakdown={priceBreakdown}
        hotel={hotel}
        travelDates={travelDates}
        travelArrangement={travelArrangement}
        search={search}
        isCalculatingPrice={isCalculatingPrice}
      />
      {search && (
        <Button onClick={onBookNowClick} disabled={isCalculatingPrice} block>
          <Translate t="holidays.detail.book_button" />
        </Button>
      )}
    </ContentWrapper>
  </>
);

export default YourPackage;
