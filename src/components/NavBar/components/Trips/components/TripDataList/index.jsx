// @flow
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import styled from "styled-components";

import environment from "../../../../../../services/environment";
import * as intlContext from "../../../../../../services/intl/context";
import Text from "../../../../../Text";
import Menu from "../Menu";
import TripHeader from "../TripHeader";
import TripList from "../TripList";

type Props = {|
  token: string,
  // DI
  env: typeof environment,
|};

const StateContainer = styled.div`
  padding: 10px;
`;

const TripDataList = ({ env, token }: Props) => (
  <QueryRenderer
    environment={env}
    variables={{ token }}
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
          <Menu>
            <StateContainer>
              <Alert type="critical">{String(res.error)}</Alert>
            </StateContainer>
          </Menu>
        );
      }

      if (!res.props) {
        return (
          <Menu>
            <StateContainer>
              <Text t={__("common.loading")} />
            </StateContainer>
          </Menu>
        );
      }

      const { customerBookings } = res.props;
      if (!customerBookings) {
        return (
          <Menu>
            <StateContainer>
              <Alert>
                <Text t={__("account.no_trips")} />
              </Alert>
            </StateContainer>
          </Menu>
        );
      }

      return (
        <Menu>
          <TripHeader trips={customerBookings} />
          <intlContext.Consumer>
            {intl => <TripList list={customerBookings} lang={intl.language.id} />}
          </intlContext.Consumer>
        </Menu>
      );
    }}
  />
);

TripDataList.defaultProps = {
  env: environment,
};

export default TripDataList;
