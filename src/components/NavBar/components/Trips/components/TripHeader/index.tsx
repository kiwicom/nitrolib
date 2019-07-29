
import * as React from "react";
import { graphql, createFragmentContainer } from "@kiwicom/relay";

import ButtonLink from "../../../../primitives/ButtonLink";
import Translate from "../../../../../Translate";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";
import { TripHeader_list } from "./__generated__/TripHeader_list.graphql";

type Props = {
  list: TripHeader_list,
};

const TripHeader = ({ list }: Props) => {
  const countTrips = list.edges
    ? list.edges
        .map(edge => edge && edge.node)
        .filter(Boolean)
        .filter(item => item.isPastBooking === false).length
    : 0;

  return (
    <IntlConsumer>
      {intl => (
        <>
          <ButtonLink
            marginLeft={20}
            bold
            href={`/${intl.language.id}/account#future`}
            color="secondary"
          >
            <Translate t="account.upcoming_trips" values={{ trips: countTrips }} />
          </ButtonLink>
          <ButtonLink
            marginRight={20}
            bold
            href={`/${intl.language.id}/account#past`}
            color="primary"
          >
            <Translate t="account.past_trips" />
          </ButtonLink>
        </>
      )}
    </IntlConsumer>
  );
};

export const TripHeaderUnwrapped = TripHeader;

export default createFragmentContainer(TripHeader, {
  list: graphql`
    fragment TripHeader_list on BookingInterfaceConnection {
      edges {
        node {
          isPastBooking
        }
      }
    }
  `,
});
