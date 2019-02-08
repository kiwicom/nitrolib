// @flow
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import type { Environment } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import styled from "styled-components";

import Translate from "../../../../../Translate";
import TripContainer from "../../../../../TripsContainer";
import SingleTripHeader from "../SingleTripHeader";
import SingleBookingTrip from "../SingleBookingTrip";
import SingleTripBottom from "../SingleTripBottom";

type Props = {|
  onSelect: (bid: string) => void,
  singleBid: number,
  // DI
  env: Environment,
|};

const StateContainer = styled.div`
  padding: 10px;
`;

const SingleTripData = ({ env, onSelect, singleBid }: Props) => (
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
    render={res => {
      if (res.error) {
        return (
          <TripContainer padding positionMenuTablet={0} positionMenuDesktop={50}>
            <StateContainer>
              <Alert type="critical">{String(res.error)}</Alert>
            </StateContainer>
          </TripContainer>
        );
      }

      if (!res.props) {
        return (
          <TripContainer padding positionMenuTablet={0} positionMenuDesktop={50}>
            <StateContainer>
              <Translate t="common.loading" />
            </StateContainer>
          </TripContainer>
        );
      }

      const { singleBooking } = res.props;
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
          {singleBooking && (
            <>
              <SingleBookingTrip trip={singleBooking} onSelect={onSelect} />
              <SingleTripBottom />
            </>
          )}
        </TripContainer>
      );
    }}
  />
);

export default SingleTripData;
