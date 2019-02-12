// @flow

import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Location from "@kiwicom/orbit-components/lib/icons/Location";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import RatingStars from "@kiwicom/orbit-components/lib/RatingStars";

import Translate from "../../../Translate";

type Props = {
  +name: ?string,
  +address: ?{|
    +fullAddress: ?string,
  |},
  +rating: ?number,
  onShownOnMapClick: () => void,
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

const HeadingWrapper = styled.div`
  ${mq.largeMobile(css`
    margin-right: ${({ theme }) => theme.orbit.spaceXSmall};
  `)};
`;

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

const ButtonWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.orbit.spaceLarge};
`;

const HotelInfo = ({ name, address, rating, onShownOnMapClick }: Props) => {
  const fullAddress = address?.fullAddress;
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
          {rating ? (
            <RatingStarsWrapper>
              <RatingStars rating={rating} color="secondary" />
            </RatingStarsWrapper>
          ) : null}
        </HotelName>
        {fullAddress && (
          <Stack direction="row" spacing="tight" spaceAfter="medium">
            <Location size="small" color="secondary" />
            <Text>{fullAddress}</Text>
          </Stack>
        )}
      </Address>
      <ButtonWrapper>
        <Button onClick={onShownOnMapClick} size="small" type="secondary" block>
          <Translate t="holidays.accommodation.show_map" />
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default HotelInfo;
