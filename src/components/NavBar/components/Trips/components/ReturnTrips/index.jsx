// @flow
import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import idx from "idx";

import type { ReturnTrips_item } from "./__generated__/ReturnTrips_item.graphql";
import TripItem from "../TripItem";

type Props = {|
  item: ReturnTrips_item,
  lang?: string,
|};

const ReturnTrips = ({ item, lang }: Props) => (
  <TripItem
    id={item.id}
    lang={lang || ""}
    img={idx(item, _ => _.destinationImageUrl) || ""}
    passengerCount={idx(item, _ => _.passengerCount) || 0}
    departureCity={idx(item, _ => _.outbound.departure.airport.city.name) || ""}
    departureTime={idx(item, _ => _.outbound.departure.localTime) || new Date()}
    arrivalTime={idx(item, _ => _.inbound.arrival.localTime) || new Date()}
    arrivalCity={idx(item, _ => _.outbound.arrival.airport.city.name) || ""}
  />
);

export const ReturnTripsUnwrapped = ReturnTrips;

export default createFragmentContainer(
  ReturnTrips,
  graphql`
    fragment ReturnTrips_item on BookingReturn {
      id
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
);
