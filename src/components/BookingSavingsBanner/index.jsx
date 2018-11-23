// @flow strict

import React from "react";
import styled from "styled-components";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Deals from "@kiwicom/orbit-components/lib/icons/Deals";
import Button from "@kiwicom/orbit-components/lib/Button";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import * as rtl from "../../styles/rtl";
import Text from "../Text";

const Container = styled.div`
  postion: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 3px;
  border: solid 1px ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormal};
  background-color: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  padding: ${rtl.box(24, 24, 24, 24)};
`;

Container.defaultProps = {
  theme: themeDefault,
};

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DealsContainer = styled.div`
  margin-right: 0.5rem;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }: ThemeProps) => theme.orbit.colorTextPrimary};
`;

Description.defaultProps = {
  theme: themeDefault,
};
const BannerDescription = styled.div`
  width: 70%;
`;
const BannerLogo = styled.div`
  width: 30%;
`;

type Props = {|
  dataTest?: string,
  hrefLearnMore: string,
  onMoreTripsClick: (e: SyntheticEvent<HTMLButtonElement>) => void,
|};

const BookingSavingsBanner = ({
  dataTest = "booking-savings-banner",
  onMoreTripsClick,
  hrefLearnMore,
}: Props) => (
  <Container data-test={dataTest}>
    <BannerDescription>
      <Stack align="center" direction="column">
        <Row>
          <DealsContainer>
            <Deals />
          </DealsContainer>
          <Heading element="h2" type="title2">
            <Text t="booking.savings_banner.title" />
          </Heading>
        </Row>
        <Row>
          <Description>
            <Text t="booking.savings_banner.description" />
          </Description>
        </Row>
        <Row>
          <Button
            dataTest="saving-banner-button-find-more-trips"
            onClick={onMoreTripsClick}
            type="secondary"
            size="normal"
          >
            <Text t="booking.savings_banner.find_more_trips" />
          </Button>
          <ButtonLink
            dataTest="saving-banner-button-learn-more"
            href={hrefLearnMore}
            type="secondary"
          >
            <Text t="common.learn_more" />
          </ButtonLink>
        </Row>
      </Stack>
    </BannerDescription>
    <BannerLogo>
      <Stack align="center" direction="column">
        <Illustration name="Money" size="small" />
      </Stack>
    </BannerLogo>
  </Container>
);

export default BookingSavingsBanner;
