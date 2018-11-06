// @flow
import React from "react";
import { createFragmentContainer, graphql } from "react-relay";

import type { MulticityTrips_item } from "./__generated__/MulticityTrips_item.graphql";
import TripItem from "../TripItem";

type Props = {|
  item: MulticityTrips_item,
  onSelect: (bid: string) => void,
|};

const MulticityTrips = ({ item, onSelect }: Props) => {
  const multicityFirst = item.trips && item.trips.slice(1, 2)[0];
  const countOtherCities = item.trips && item.trips.slice(1);

  return (
    <TripItem
      bid={String(item.databaseId)}
      img={item.destinationImageUrl || ""}
      departureTime={item.start?.localTime || new Date()}
      arrivalTime={item.end?.localTime || new Date()}
      passengerCount={item.passengerCount || 0}
      departureCity={item.start?.airport?.city?.name || ""}
      arrivalCity={item.end?.airport?.city?.name || ""}
      multicityFirst={multicityFirst?.departure?.airport?.city?.name || ""}
      countOtherCities={Array.isArray(countOtherCities) ? countOtherCities.length : 0}
      onSelect={onSelect}
    />
  );
};

export const MulticityTripsUnwrapped = MulticityTrips;

export default createFragmentContainer(
  MulticityTrips,
  graphql`
    fragment MulticityTrips_item on BookingMulticity {
      databaseId
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
