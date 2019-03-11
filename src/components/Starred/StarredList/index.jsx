// @flow strict
import * as React from "react";
import styled from "styled-components";

import getSum from "../services/getSum";
import isMulti from "../services/isMulti";
import itemIsValid from "../services/itemIsValid";
import StarredItinerary from "../StarredItinerary";
import type { StarredItem } from "../../../records/Starred";
import Text from "../../Text";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import { flatten } from "../../../records/Itinerary";

type Props = {|
  trips: Array<StarredItem>,
  onRemove: (arg: string) => void,
  tripsCount: number,
  goToJourneyNitro: (item: StarredItem) => void,
  shareUrl: (item: StarredItem) => string,
|};

const NoFlights = styled.div`
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  max-width: 550px;
`;

NoFlights.defaultProps = {
  theme: themeDefault,
};

const StarredList = ({ trips, onRemove, tripsCount, shareUrl, goToJourneyNitro }: Props) => {
  const tripList: React$Node =
    trips &&
    trips.map(trip => {
      const { id, updatedAt, lastPrice, itinerary, priceUpdatedAt, form, createdAt } = trip;
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
          // converts to flatten data structure
          itinerary={flatten(itinerary)}
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
      <Text t="starred.no_flights" />
    </NoFlights>
  );
};

export default StarredList;
