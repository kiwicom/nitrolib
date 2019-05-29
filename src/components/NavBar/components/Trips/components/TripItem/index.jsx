// @flow
import * as React from "react";
import RouteOneStop from "@kiwicom/orbit-components/lib/icons/RouteOneStop";
import RouteTwoStops from "@kiwicom/orbit-components/lib/icons/RouteTwoStops";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import parseISO from "date-fns/fp/parseISO";

import { themeDefault } from "../../../../../../records/Theme";
import ItemWrapper from "../../primitives/ItemWrapper";
import TripInfo from "../../primitives/TripInfo";
import Column from "../../primitives/Column";
import TripInfoLine from "../../primitives/TripInfoLine";
import Translate from "../../../../../Translate";
import Day from "../../../../../Day";

type Props = {|
  bid: string,
  img?: string,
  arrivalTime: Date,
  departureTime: Date,
  departureCity: ?string,
  arrivalCity: ?string,
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

  ${mq.mediumMobile(css`
    height: 180px;
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
    <Img src={img} alt="img" />
    <TripInfo>
      <Column>
        <TripInfoLine darker>
          {departureCity}
          {countOtherCities !== 0 && <RouteOneStop size="small" />}
          {multicityFirst}
          {+countOtherCities > 1 && (
            <>
              <RouteTwoStops size="medium" />
              <Translate t="account.trips_others" values={{ others: countOtherCities }} />
            </>
          )}
        </TripInfoLine>
        <TripInfoLine fontSize="24" darker>
          {arrivalCity}
        </TripInfoLine>
      </Column>
      <Column>
        <TripInfoLine>
          <Day date={parseISO(departureTime)} /> - <Day date={parseISO(arrivalTime)} />
        </TripInfoLine>
        <TripInfoLine>
          <Translate t="account.trips_passengers" values={{ passengers: passengerCount }} />
        </TripInfoLine>
      </Column>
    </TripInfo>
  </ItemWrapper>
);

TripItem.defaultProps = {
  countOtherCities: 0,
};

export default TripItem;
