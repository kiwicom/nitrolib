// @flow
import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import idx from "idx";

import type { MulticityTrips_item } from "./__generated__/MulticityTrips_item.graphql";
import TripItem from "../TripItem";

type Props = {|
  item: MulticityTrips_item,
  lang?: string,
|};

const MulticityTrips = ({ item, lang }: Props) => {
  const { trips } = item;
  const multicityFirst = trips && trips.slice(1, 2)[0];
  const countOtherCities = trips && trips.slice(1);
  return (
    <TripItem
      id={item.id}
      lang={lang || ""}
      img={idx(item, _ => _.destinationImageUrl) || ""}
      departureTime={idx(item, _ => _.start.localTime) || new Date()}
      arrivalTime={idx(item, _ => _.end.localTime) || new Date()}
      passengerCount={idx(item, _ => _.passengerCount) || 0}
      departureCity={idx(item, _ => _.start.airport.city.name) || ""}
      arrivalCity={idx(item, _ => _.end.airport.city.name) || ""}
      multicityFirst={idx(multicityFirst, _ => _.departure.airport.city.name) || ""}
      countOtherCities={Array.isArray(countOtherCities) ? countOtherCities.length : 0}
    />
  );
};

export const MulticityTripsUnwrapped = MulticityTrips;

export default createFragmentContainer(
  MulticityTrips,
  graphql`
    fragment MulticityTrips_item on BookingMulticity {
      id
      destinationImageUrl
      passengerCount
      __typename
      start {
        localTime
        airport {
          city {
            name
          }
        }
      }
      end {
        localTime
        airport {
          city {
            name
          }
        }
      }
      trips {
        departure {
          airport {
            city {
              name
            }
          }
        }
        arrival {
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
