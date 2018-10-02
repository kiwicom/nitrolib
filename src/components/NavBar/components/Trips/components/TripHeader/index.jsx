// @flow
import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";

import Text from "../../../../../Text";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";
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
    <IntlConsumer>
      {intl => (
        <>
          <TextLink type="primary" href={`/${intl.language.id}/account#future`}>
            <Text t={__("account.upcoming_trips")} values={{ trips: countTrips }} />
          </TextLink>
          <TextLink type="secondary" href={`/${intl.language.id}/account#past`}>
            <Text t={__("account.past_trips")} />
          </TextLink>
        </>
      )}
    </IntlConsumer>
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
