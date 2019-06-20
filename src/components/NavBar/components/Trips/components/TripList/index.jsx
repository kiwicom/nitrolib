// @flow strict
import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import styled from "styled-components";

import Translate from "../../../../../Translate";
import type { TripList_list } from "./__generated__/TripList_list.graphql";
import OneWayTrips from "../OneWayTrips";
import MulticityTrips from "../MulticityTrips";
import ReturnTrips from "../ReturnTrips";
import { themeDefault } from "../../../../../../records/Theme";
import type { ThemeProps } from "../../../../../../records/Theme";

const Paddings = styled.div`
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
`;

Paddings.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  list: TripList_list,
  onSelect: (bid: string) => void,
|};

const TripList = ({ list, onSelect }: Props) => {
  const trips = list.edges && list.edges.map(edge => edge && edge.node).filter(Boolean);
  const upcoming = trips && trips.filter(trip => trip && !trip.isPastBooking && trip);
  const firstTwo = upcoming && upcoming.slice(0, 2);

  if (upcoming && upcoming.length === 0) {
    return (
      <Paddings>
        <Translate t="account.no_trips" />
      </Paddings>
    );
  }

  return (
    <>
      {firstTwo &&
        firstTwo.map(item => {
          /* eslint-disable no-underscore-dangle */
          if (item.__typename === "BookingOneWay") {
            /* $FlowExpected: TODO describe */
            return <OneWayTrips key={item.id} item={item} onSelect={onSelect} />;
          }
          if (item.__typename === "BookingReturn") {
            /* $FlowExpected: TODO describe */
            return <ReturnTrips key={item.id} item={item} onSelect={onSelect} />;
          }
          if (item.__typename === "BookingMulticity") {
            /* $FlowExpected: TODO describe */
            return <MulticityTrips key={item.id} item={item} onSelect={onSelect} />;
          }
          /* eslint-enable no-underscore-danble */
          return null;
        })}
    </>
  );
};

export const TripListUnwrapped = TripList;

export default createFragmentContainer(
  TripList,
  graphql`
    fragment TripList_list on BookingInterfaceConnection {
      edges {
        node {
          __typename
          id
          isPastBooking
          ...OneWayTrips_item
          ...MulticityTrips_item
          ...ReturnTrips_item
        }
      }
    }
  `,
);
