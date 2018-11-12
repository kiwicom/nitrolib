// @flow
import * as React from "react";
import styled from "styled-components";

import { getSum, isMulti, itemIsValid } from "../helpers";
import StarredItinerary from "../StarredItinerary";
import type { StarredItem } from "../../../records/Starred";
import Text from "../../Text";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type Props = {|
  trips: Array<StarredItem>,
  onRemove: (arg: string) => void,
  tripsCount: number,
  goToJourneyNitro: (item: StarredItem) => void,
  shareUrl: (item: StarredItem) => string,
|};

const NoFlights = styled.div`
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
`;

NoFlights.defaultProps = {
  theme: themeDefault,
};

const StarredList = ({ trips, onRemove, tripsCount, shareUrl, goToJourneyNitro }: Props) => {
  const tripList: React$Node =
    trips &&
    trips.map(trip => {
      const { id, updatedAt, lastPrice, journey, priceUpdatedAt, form, createdAt } = trip;
      const { passengers, cabinClass } = form;
      return (
        <StarredItinerary
          key={id}
          passengerCount={getSum(passengers)}
          passengerMulty={isMulti(passengers)}
          isValid={itemIsValid(trip)}
          passengers={passengers}
          price={lastPrice}
          goToJourneyNitro={() => goToJourneyNitro(trip)}
          cabinClass={cabinClass}
          journey={journey}
          shareUrl={shareUrl(trip)}
          onRemove={() => onRemove(id)}
          created={createdAt}
          updated={updatedAt}
          priceUpdatedAt={priceUpdatedAt}
        />
      );
    });

  return tripsCount >= 1 ? (
    tripList
  ) : (
    <NoFlights>
      <Text t={__("starred.no_flights")} />
    </NoFlights>
  );
};

export default StarredList;
