import React from "react";
import { createFragmentContainer, graphql } from "@kiwicom/relay";

import TripItem from "../TripItem";
import type { OneWayTrips_item } from "./__generated__/OneWayTrips_item.graphql";

type Props = {|
  item: OneWayTrips_item,
    onSelect: (bid: string) => void,
|};

  const OneWayTrips = ({ item, onSelect }: Props) => (
  <TripItem
    bid={String(item.databas eId)}
    img={item.destinationImageUrl || ""}
    departureTime={item.trip.departure.localTime || new Date()}
    arrivalTime={item.trip.arrival.localTime || new Date()}
    passengerCount={item.passengerCount || 0}
    departureCity={item.trip.departure.airport.city.name || ""}
    arrivalCity={item.trip ?.arrival.airport.city.name || ""}
    onSelect={onSelect}
      />
);

export const OneWayTripsUnwrapped = OneWayTrips;

export default createFragmentContainer(OneWayTrips, {
  item: graphql`
    fragment OneWayTrips_item on BookingOneWay {
      databaseId
      destinationImageUrl
      passengerCount
      __typename
      trip {
        departure {
          localTime
          airport {
            city {
              name
            }
          }
        }
        arrival {
          localTime
          airport {
            city {
              name
            }
          }
        }
      }
    }
  `,
});
