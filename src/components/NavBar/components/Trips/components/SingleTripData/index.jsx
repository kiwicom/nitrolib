// @flow
import * as React from "react";
import { graphql, QueryRenderer } from "@kiwicom/relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import styled from "styled-components";
import type { Environment } from "@kiwicom/relay";

import Translate from "../../../../../Translate";
import TripContainer from "../../../../../TripsContainer";
import SingleTripHeader from "../SingleTripHeader";
import SingleBookingTrip from "../SingleBookingTrip";
import SingleTripBottom from "../SingleTripBottom";

type Props = {|
  onSelect: (bid: string) => void,
  singleBid: number,
  env: Environment,
|};

const StateContainer = styled.div`
  padding: 10px;
`;

const SingleTripData = ({ onSelect, singleBid, env }: Props) => (
  <QueryRenderer
    environment={env}
    query={graphql`
      query SingleTripDataQuery($bookingID: Int!) {
        singleBooking(id: $bookingID) {
          ...SingleBookingTrip_trip
        }
      }
    `}
    variables={{ bookingID: singleBid }}
    onSystemError={res => (
      <TripContainer padding positionMenuTablet={0} positionMenuDesktop={50}>
        <StateContainer>
          <Alert type="critical">{String(res.error)}</Alert>
        </StateContainer>
      </TripContainer>
    )}
    onLoading={() => (
      <TripContainer padding positionMenuTablet={0} positionMenuDesktop={50}>
        <StateContainer>
          <Translate t="common.loading" />
        </StateContainer>
      </TripContainer>
    )}
    onResponse={res => {
      const { singleBooking } = res;
      if (!singleBooking) {
        return (
          <TripContainer padding positionMenuTablet={0} positionMenuDesktop={50}>
            <StateContainer>
              <Alert>
                <Translate t="account.no_trips" />
              </Alert>
            </StateContainer>
          </TripContainer>
        );
      }
      return (
        <TripContainer
          header={<SingleTripHeader />}
          positionMenuTablet={0}
          positionMenuDesktop={50}
        >
          <SingleBookingTrip trip={singleBooking} onSelect={onSelect} />
          <SingleTripBottom />
        </TripContainer>
      );
    }}
  />
);

export default SingleTripData;
