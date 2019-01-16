// @flow
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import type { Environment } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import styled from "styled-components";

import Translate from "../../../../../Translate";
import TripHeader from "../TripHeader";
import TripList from "../TripList";
import TripContainer from "../../../../../TripsContainer";

type Props = {|
  portal: string,
  onSelect: (bid: string) => void,
  // DI
  env: Environment,
|};

const StateContainer = styled.div`
  padding: 10px;
`;

const TripDataList = ({ env, portal, onSelect }: Props) => (
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
          <TripContainer portal={portal} padding>
            <StateContainer>
              <Alert type="critical">{String(res.error)}</Alert>
            </StateContainer>
          </TripContainer>
        );
      }

      if (!res.props) {
        return (
          <TripContainer portal={portal} padding>
            <StateContainer>
              <Translate t="common.loading" />
            </StateContainer>
          </TripContainer>
        );
      }

      const { customerBookings } = res.props;
      if (!customerBookings) {
        return (
          <TripContainer portal={portal} padding>
            <StateContainer>
              <Alert>
                <Translate t="account.no_trips" />
              </Alert>
            </StateContainer>
          </TripContainer>
        );
      }

      return (
        <TripContainer header={<TripHeader trips={customerBookings} />} portal={portal}>
          <TripList list={customerBookings} onSelect={onSelect} />
        </TripContainer>
      );
    }}
  />
);

export default TripDataList;
