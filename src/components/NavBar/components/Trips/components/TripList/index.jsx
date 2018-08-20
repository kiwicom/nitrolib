// @flow
import React from "react";
import { createFragmentContainer, graphql } from "react-relay";

import Text from "../../../../../Text";
import type { TripList_list } from "./__generated__/TripList_list.graphql";
import OneWayTrips from "../OneWayTrips";
import MulticityTrips from "../MulticityTrips";
import TripListBottom from "../TripListBottom";
import BottomTripItem from "../BottomTripItem";
import ReturnTrips from "../ReturnTrips";

type Props = {|
  list: TripList_list,
  lang: string,
|};

const TripList = ({ list, lang }: Props) => {
  const trips = list.edges && list.edges.map(edge => edge && edge.node).filter(Boolean);
  const firstTwo = trips && trips.slice(0, 2);
  const futureTrips = trips && trips.slice(2, 6);
  if (trips && trips.length === 0) return <Text t={__("account.no_trips")} />;

  return (
    <>
      {firstTwo &&
        firstTwo.map(item => {
          /* eslint-disable no-underscore-dangle */
          if (item.__typename === "BookingOneWay") {
            /* $FlowIssue */
            return <OneWayTrips key={item.id} item={item} lang={lang} />;
          }
          if (item.__typename === "BookingReturn") {
            /* $FlowIssue */
            return <ReturnTrips key={item.id} item={item} lang={lang} />;
          }
          if (item.__typename === "BookingMulticity") {
            /* $FlowIssue */
            return <MulticityTrips key={item.id} item={item} lang={lang} />;
          }
          /* eslint-enable no-underscore-danble */

          return null;
        })}
      <TripListBottom>
        {futureTrips &&
          futureTrips.length > 0 &&
          /* $FlowIssue */
          futureTrips.map(item => (
            <BottomTripItem
              key={item.id}
              id={item.id}
              imageUrl={item.destinationImageUrl || ""}
              lang={lang}
            />
          ))}
      </TripListBottom>
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
          destinationImageUrl
          ...OneWayTrips_item
          ...MulticityTrips_item
          ...ReturnTrips_item
        }
      }
    }
  `,
);
