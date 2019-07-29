
import React from "react";
import { createFragmentContainer, graphql } from "@kiwicom/relay";

import OneWayTrips from "../OneWayTrips";
import MulticityTrips from "../MulticityTrips";
import ReturnTrips from "../ReturnTrips";
import { SingleBookingTrip_trip } from "./__generated__/SingleBookingTrip_trip.graphql";

type Props = {
  trip: SingleBookingTrip_trip,
  onSelect: (bid: string) => void,
};

const SingleBookingTrip = ({ trip, onSelect }: Props) => {
  /* eslint-disable no-underscore-dangle */
  switch (trip.__typename) {
    case "BookingOneWay":
      /* $FlowExpected: TODO describe */
      return <OneWayTrips key={trip.id} item={trip} onSelect={onSelect} />;
    case "BookingReturn":
      /* $FlowExpected: TODO describe */
      return <ReturnTrips key={trip.id} item={trip} onSelect={onSelect} />;
    case "BookingMulticity":
      /* $FlowExpected: TODO describe */
      return <MulticityTrips key={trip.id} item={trip} onSelect={onSelect} />;
    default:
      return null;
  }
  /* eslint-enable no-underscore-danble */
};

export const SingleBookingTripUnWrapped = SingleBookingTrip;

export default createFragmentContainer(SingleBookingTrip, {
  trip: graphql`
    fragment SingleBookingTrip_trip on BookingInterface {
      __typename
      id
      ...OneWayTrips_item
      ...MulticityTrips_item
      ...ReturnTrips_item
    }
  `,
});
