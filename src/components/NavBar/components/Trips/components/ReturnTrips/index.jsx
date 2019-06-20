// @flow
import React from "react";
import { createFragmentContainer, graphql } from "react-relay";

import type { ReturnTrips_item } from "./__generated__/ReturnTrips_item.graphql";
import TripItem from "../TripItem";

type Props = {|
  item: ReturnTrips_item,
  onSelect: (bid: string) => void,
|};

const ReturnTrips = ({ item, onSelect }: Props) => (
  <TripItem
    bid={String(item.databaseId)}
    img={item.destinationImageUrl || ""}
    passengerCount={item.passengerCount || 0}
    departureCity={item.outbound?.departure?.airport?.city?.name || ""}
    departureTime={item.outbound?.departure?.localTime || new Date()}
    arrivalTime={item.inbound?.arrival?.localTime || new Date()}
    arrivalCity={item.outbound?.arrival?.airport?.city?.name || ""}
    onSelect={onSelect}
  />
);

export const ReturnTripsUnwrapped = ReturnTrips;

export default createFragmentContainer(ReturnTrips, {
  item: graphql`
    fragment ReturnTrips_item on BookingReturn {
      databaseId
      destinationImageUrl
      passengerCount
      __typename
      outbound {
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
      inbound {
        arrival {
          localTime
          airport {
            city {
              name
            }
          }
        }
        departure {
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
