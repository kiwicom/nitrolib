// @flow
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import type { Environment } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import styled from "styled-components";

import Text from "../../../../../Text";
import TripHeader from "../TripHeader";
import TripList from "../TripList";
import TripContainer from "../../../../../TripsContainer";

type Props = {|
  onSelect: (bid: string) => void,
  // DI
  env: Environment,
|};

const StateContainer = styled.div`
  padding: 10px;
`;

const TripDataList = ({ env, onSelect }: Props) => (
  <QueryRenderer
    environment={env}
    query={graphql`
      query TripDataListQuery {
        customerBookings {
          ...TripList_list
          ...TripHeader_trips
        }
      }
    `}
    variables={{}}
    render={res => {
      if (res.error) {
        return (
          <TripContainer positionMenuTablet={0} positionMenuDesktop={50}>
            <StateContainer>
              <Alert type="critical">{String(res.error)}</Alert>
            </StateContainer>
          </TripContainer>
        );
      }

      if (!res.props) {
        return (
          <TripContainer positionMenuTablet={0} positionMenuDesktop={50}>
            <StateContainer>
              <Text t={__("common.loading")} />
            </StateContainer>
          </TripContainer>
        );
      }

      const { customerBookings } = res.props;
      if (!customerBookings) {
        return (
          <TripContainer positionMenuTablet={0} positionMenuDesktop={50}>
            <StateContainer>
              <Alert>
                <Text t={__("account.no_trips")} />
              </Alert>
            </StateContainer>
          </TripContainer>
        );
      }

      return (
        <TripContainer
          header={<TripHeader trips={customerBookings} />}
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
