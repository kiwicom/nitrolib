// @flow
import * as React from "react";
import RouteOneStop from "@kiwicom/orbit-components/lib/icons/RouteOneStop";
import RouteTwoStops from "@kiwicom/orbit-components/lib/icons/RouteTwoStops";

import ItemWrapper from "../../primitives/ItemWrapper";
import TripInfo from "../../primitives/TripInfo";
import Column from "../../primitives/Column";
import TripInfoLine from "../../primitives/TripInfoLine";
import Text from "../../../../../Text";
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

const styleImg = {
  display: "flex",
  justifyContent: "center",
  overlfow: "hidden",
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
    <img src={img} alt="img" height="180" style={styleImg} />
    <TripInfo>
      <Column>
        <TripInfoLine darker>
          {departureCity}
          {countOtherCities !== 0 && <RouteOneStop size="small" />}
          {multicityFirst}
          {+countOtherCities > 1 && (
            <>
              <RouteTwoStops size="medium" />
              <Text t={__("account.trips_others")} values={{ countOtherCities }} />
            </>
          )}
        </TripInfoLine>
        <TripInfoLine fontSize="24" darker>
          {arrivalCity}
        </TripInfoLine>
      </Column>
      <Column>
        <TripInfoLine>
          <Day date={departureTime} /> - <Day date={arrivalTime} />
        </TripInfoLine>
        <TripInfoLine>
          <Text t={__("account.trips_passengers")} values={{ passengers: passengerCount }} />
        </TripInfoLine>
      </Column>
    </TripInfo>
  </ItemWrapper>
);

TripItem.defaultProps = {
  countOtherCities: 0,
};

export default TripItem;
