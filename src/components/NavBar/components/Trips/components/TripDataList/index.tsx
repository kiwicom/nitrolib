
import * as React from "react";
import { graphql, QueryRenderer } from "@kiwicom/relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import { Environment } from "@kiwicom/relay";

import Translate from "../../../../../Translate";
import TripHeader from "../TripHeader";
import TripList from "../TripList";
import TripContainer from "../../../../../TripsContainer";
import TripListBottom from "../TripListBottom";

type Props = {
  onSelect: (bid: string) => void,
  env: Environment,
};

const TripDataList = ({ onSelect, env }: Props) => (
  <QueryRenderer
    environment={env}
    query={graphql`
      query TripDataListQuery(
        $only: CustomerBookingsOnlyEnum!
        $order: CustomerBookingsOrderEnum!
      ) {
        customerBookings(only: $only, order: $order) {
          ...TripHeader_list
          ...TripList_list
          ...TripListBottom_list
        }
      }
    `}
    variables={{ only: "FUTURE", order: "ASC" }}
    onSystemError={res => (
      <TripContainer padding positionMenuTablet={0} positionMenuDesktop={50}>
        <Alert type="critical">{String(res.error)}</Alert>
      </TripContainer>
    )}
    onLoading={() => (
      <TripContainer padding positionMenuTablet={0} positionMenuDesktop={50}>
        <Translate t="common.loading" />
      </TripContainer>
    )}
    onResponse={res => {
      const { customerBookings } = res;
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
