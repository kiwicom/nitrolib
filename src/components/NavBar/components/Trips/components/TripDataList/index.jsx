// @flow
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import styled from "styled-components";

import environment from "../../../../../../services/auth/environment";
import * as intlContext from "../../../../../../services/intl/context";
import Text from "../../../../../Text";
import TripHeader from "../TripHeader";
import TripList from "../TripList";
import TripContainer from "../../../../../TripsContainer";

type Props = {|
  env: typeof environment,
|};

const StateContainer = styled.div`
  padding: 10px;
`;

const TripDataList = ({ env }: Props) => (
  <QueryRenderer
    environment={env}
    variables={{}}
    query={graphql`
      query TripDataListQuery {
        customerBookings {
          ...TripList_list
          ...TripHeader_trips
        }
      }
    `}
    render={res => {
      if (res.error) {
        return (
          <TripContainer>
            <StateContainer>
              <Alert type="critical">{String(res.error)}</Alert>
            </StateContainer>
          </TripContainer>
        );
      }

      if (!res.props) {
        return (
          <TripContainer>
            <StateContainer>
              <Text t={__("common.loading")} />
            </StateContainer>
          </TripContainer>
        );
      }

      const { customerBookings } = res.props;
      if (!customerBookings) {
        return (
          <TripContainer>
            <StateContainer>
              <Alert>
                <Text t={__("account.no_trips")} />
              </Alert>
            </StateContainer>
          </TripContainer>
        );
      }

      return (
        <TripContainer header={<TripHeader trips={customerBookings} />}>
          <intlContext.Consumer>
            {intl => <TripList list={customerBookings} lang={intl.language.id} />}
          </intlContext.Consumer>
        </TripContainer>
      );
    }}
  />
);

TripDataList.defaultProps = {
  env: environment,
};

export default TripDataList;
