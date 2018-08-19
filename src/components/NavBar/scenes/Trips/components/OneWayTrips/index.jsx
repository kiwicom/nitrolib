// @flow
import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import idx from "idx";

import TripItem from "../TripItem";
import type { OneWayTrips_item } from "./__generated__/OneWayTrips_item.graphql";

type Props = {|
  item: OneWayTrips_item,
  lang?: string,
|};

const OneWayTrips = ({ item, lang }: Props) => (
  <TripItem
    id={item.id}
    lang={lang || ""}
    img={idx(item, _ => _.destinationImageUrl) || ""}
    departureTime={idx(item, _ => _.trip.departure.localTime) || new Date()}
    arrivalTime={idx(item, _ => _.trip.arrival.localTime) || new Date()}
    passengerCount={idx(item, _ => _.passengerCount) || 0}
    departureCity={idx(item, _ => _.trip.departure.airport.city.name) || ""}
    arrivalCity={idx(item, _ => _.trip.arrival.airport.city.name) || ""}
  />
);

export const OneWayTripsUnwrapped = OneWayTrips;

export default createFragmentContainer(
  OneWayTrips,
  graphql`
    fragment OneWayTrips_item on BookingOneWay {
      id
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
);
