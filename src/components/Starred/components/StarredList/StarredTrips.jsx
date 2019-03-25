// @flow strict
import * as React from "react";

import StarredItinerary from "../StarredItinerary";
import getSum from "../../services/getSum";
import isMulti from "../../services/isMulti";
import type { StarredItem } from "../../../../records/Starred";

type Props = {|
  trips: StarredItem[],
  onRemove: (arg: string) => void,
  goToJourneyNitro: (item: StarredItem) => void,
  shareUrl: (item: StarredItem) => string,
|};

const StarredTrips = ({ trips, goToJourneyNitro, shareUrl, onRemove }: Props): React.Node[] =>
  trips &&
  trips.map(trip => {
    const { id, updatedAt, itinerary, priceUpdatedAt, form, createdAt } = trip;
    const { passengers, cabinClass } = form;
    return (
      <StarredItinerary
        key={id}
        passengerCount={getSum(passengers)}
        passengerMulty={isMulti(passengers)}
        passengers={passengers}
        goToJourneyNitro={() => goToJourneyNitro(trip)}
        cabinClass={cabinClass}
        itinerary={itinerary}
        shareUrl={shareUrl(trip)}
        onRemove={() => onRemove(id)}
        created={createdAt}
        updated={updatedAt}
        priceUpdatedAt={priceUpdatedAt}
      />
    );
  });

export default StarredTrips;
