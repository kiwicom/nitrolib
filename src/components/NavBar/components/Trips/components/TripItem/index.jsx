// @flow
import * as React from "react";
import RouteOneStop from "@kiwicom/orbit-components/lib/icons/RouteOneStop";
import RouteTwoStops from "@kiwicom/orbit-components/lib/icons/RouteTwoStops";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import parseISO from "date-fns/fp/parseISO";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import { themeDefault } from "../../../../../../records/Theme";
import ItemWrapper from "../../primitives/ItemWrapper";
import Translate from "../../../../../Translate";
import Day from "../../../../../Timestamp";

type Props = {|
  bid: string,
  img?: string,
  arrivalTime: Date,
  departureTime: Date,
  departureCity: string,
  arrivalCity: string,
  passengerCount: number,
  countOtherCities: number,
  multicityFirst?: string,
  onSelect: (bid: string) => void,
|};

const Img = styled.img`
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 120px;
  width: 100%;
  max-width: 120px;

  ${mq.mediumMobile(css`
    height: 180px;
    max-width: 180px;
  `)};
`;

Img.defaultProps = {
  theme: themeDefault,
};

const TripItem = ({
  bid,
  img,
  departureTime,
  arrivalTime,
  departureCity,
  multicityFirst,
  countOtherCities,
  arrivalCity,
  passengerCount,
  onSelect,
}: Props) => (
  <ItemWrapper onClick={() => onSelect(bid)}>
    <Stack flex align="center" spacing="comfy">
      <Img src={img} alt="img" />
      <Stack flex shrink justify="center" direction="column">
        <Stack spacing="tight">
          <Text size="large" weight="bold">
            {departureCity}
            {countOtherCities !== 0 && <RouteOneStop size="small" />}
            {multicityFirst}
            {+countOtherCities > 1 && (
              <>
                <RouteTwoStops size="medium" />
                <Translate t="account.trips_others" values={{ others: countOtherCities }} />
              </>
            )}
          </Text>
          <Text size="large" weight="bold">
            {arrivalCity}
          </Text>
        </Stack>
        <Stack spacing="tight">
          <Text weight="bold">
            <Day date={parseISO(departureTime)} /> - <Day date={parseISO(arrivalTime)} />
          </Text>
          <Text weight="bold">
            <Translate t="account.trips_passengers" values={{ passengers: passengerCount }} />
          </Text>
        </Stack>
      </Stack>
    </Stack>
  </ItemWrapper>
);

TripItem.defaultProps = {
  countOtherCities: 0,
};

export default TripItem;
