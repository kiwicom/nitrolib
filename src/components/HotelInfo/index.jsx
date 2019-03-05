// @flow strict

import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Location from "@kiwicom/orbit-components/lib/icons/Location";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import RatingStars from "@kiwicom/orbit-components/lib/RatingStars";

import Translate from "../Translate";
import { themeDefault } from "../../records/Theme";
import type { HotelType } from "../../records/HotelInfo";

export type Props = {
  hotel: ?HotelType,
  onShownOnMapClick: Function,
};

const Wrapper = styled.div`
  ${mq.largeMobile(css`
    display: flex;
    justify-content: space-between;
  `)};
`;

const Address = styled.div`
  ${mq.largeMobile(css`
    margin-right: ${({ theme }) => theme.orbit.spaceLarge};
  `)};
`;

Address.defaultProps = {
  theme: themeDefault,
};

const HeadingWrapper = styled.div`
  ${mq.largeMobile(css`
    margin-right: ${({ theme }) => theme.orbit.spaceXSmall};
  `)};
`;

HeadingWrapper.defaultProps = {
  theme: themeDefault,
};

const HotelName = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${mq.largeMobile(css`
    flex-direction: row;
  `)};
`;

const RatingStarsWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.orbit.spaceXSmall};
`;

RatingStarsWrapper.defaultProps = {
  theme: themeDefault,
};

const ButtonWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.orbit.spaceLarge};
`;

ButtonWrapper.defaultProps = {
  theme: themeDefault,
};

const HotelInfo = ({ hotel, onShownOnMapClick }: Props) => {
  const name = hotel?.name;
  const rating = hotel?.rating;
  const fullAddress = hotel?.address?.fullAddress;
  const isMMB = hotel?.isMMB;
  return (
    <Wrapper>
      <Address>
        <HotelName>
          {name && (
            <HeadingWrapper>
              <Heading element="h4" type="title2" spaceAfter="smallest">
                {name}
              </Heading>
            </HeadingWrapper>
          )}
          {!!rating && (
            <RatingStarsWrapper>
              <RatingStars rating={rating} color="secondary" />
            </RatingStarsWrapper>
          )}
        </HotelName>
        {fullAddress && (
          <Stack direction="row" spacing="tight" spaceAfter="medium">
            <Location size="small" color="secondary" />
            <Text>{fullAddress}</Text>
          </Stack>
        )}
      </Address>
      {isMMB && (
        <ButtonWrapper>
          <Button onClick={onShownOnMapClick(true)} size="small" type="secondary" block>
            <Translate t="holidays.accommodation.show_map" />
          </Button>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

export default HotelInfo;
