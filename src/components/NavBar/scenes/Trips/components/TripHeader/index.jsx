// @flow
import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";

import Button from "../../../../primitives/Button";
import Header from "../../primitives/Header";
import Text from "../../../../../Text";
import { Consumer as IntlConsumer } from "services/intl/context";
import type { TripHeader_trips } from "./__generated__/TripHeader_trips.graphql";

type Props = {|
  trips: TripHeader_trips,
|};

const TripHeader = ({ trips }: Props) => {
  const countTrips = trips.edges
    ? trips.edges
        .map(edge => edge && edge.node)
        .filter(Boolean)
        .filter(item => item.isPastBooking === false).length
    : 0;

  return (
    <Header>
      <IntlConsumer>
        {intl => (
          <>
            <Button href={`/${intl.language.id}/account#future`} marginLeft={20} primary>
              <Text t={__("account.upcoming_trips")} values={{ trips: countTrips }} />
            </Button>
            <Button href={`/${intl.language.id}/account#past`} marginRight={20}>
              <Text t={__("account.past_trips")} />
            </Button>
          </>
        )}
      </IntlConsumer>
    </Header>
  );
};

export const TripHeaderUnwrapped = TripHeader;

export default createFragmentContainer(
  TripHeader,
  graphql`
    fragment TripHeader_trips on BookingInterfaceConnection {
      edges {
        node {
          isPastBooking
        }
      }
    }
  `,
);
