// @flow
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import type { Environment } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import Translate from "../../../../../Translate";
import TripHeader from "../TripHeader";
import TripList from "../TripList";
import TripContainer from "../../../../../TripsContainer";
import TripListBottom from "../TripListBottom";

type Props = {|
  onSelect: (bid: string) => void,
  // DI
  env: Environment,
|};

const TripDataList = ({ env, onSelect }: Props) => (
  <QueryRenderer
    environment={env}
    query={graphql`
      query TripDataListQuery {
        customerBookings {
          ...TripHeader_list
          ...TripList_list
          ...TripListBottom_list
        }
      }
    `}
    variables={{}}
    render={res => {
      if (res.error) {
        return (
          <TripContainer padding positionMenuTablet={0} positionMenuDesktop={50}>
            <Alert type="critical">{String(res.error)}</Alert>
          </TripContainer>
        );
      }

      if (!res.props) {
        return (
          <TripContainer padding positionMenuTablet={0} positionMenuDesktop={50}>
            <Translate t="common.loading" />
          </TripContainer>
        );
      }

      const { customerBookings } = res.props;
      if (!customerBookings) {
        return (
          <TripContainer padding positionMenuTablet={0} positionMenuDesktop={50}>
            <Alert>
              <Translate t="account.no_trips" />
            </Alert>
          </TripContainer>
        );
      }

      return (
        <TripContainer
          header={<TripHeader list={customerBookings} />}
          footer={<TripListBottom list={customerBookings} />}
          positionMenuTablet={0}
          positionMenuDesktop={50}
        >
          <TripList list={customerBookings} onSelect={onSelect} />
        </TripContainer>
      );
    }}
  />
);

export default TripDataList;
