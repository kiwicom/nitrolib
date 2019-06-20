// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import { createFragmentContainer, graphql } from "react-relay";

import ItemWrapper from "../../primitives/ItemWrapper";
import Translate from "../../../../../Translate";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";
import ButtonLink from "../../../../primitives/ButtonLink";
import BottomTripItem from "../BottomTripItem";
import type { TripListBottom_list } from "./__generated__/TripListBottom_list.graphql";
import { themeDefault } from "../../../../../../records/Theme";

type Props = {|
  list: TripListBottom_list,
|};

const TripsBottomWrapper = styled.div`
  display: flex;
  width: 120px;
  ${mq.mediumMobile(css`
    width: 180px;
  `)};
`;

TripsBottomWrapper.defaultProps = {
  theme: themeDefault,
};

const TripListBottom = ({ list }: Props) => {
  const trips = list.edges && list.edges.map(edge => edge && edge.node).filter(Boolean);
  const futureTrips = trips && trips.slice(2, 6);

  return futureTrips && futureTrips.length > 0 ? (
    <IntlConsumer>
      {intl => (
        <ItemWrapper>
          <TripsBottomWrapper>
            {futureTrips &&
              futureTrips.map(item => (
                <BottomTripItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.destinationImageUrl || ""}
                  lang={intl.language.id}
                />
              ))}
          </TripsBottomWrapper>
          <Stack inline align="center" spacing="none">
            <ButtonLink
              color="primary"
              marginLeft={25}
              bold
              href={`/${intl.language.id}/account#future`}
            >
              <Translate t="account.all_trips" />
            </ButtonLink>
          </Stack>
        </ItemWrapper>
      )}
    </IntlConsumer>
  ) : null;
};

export const TripListBottomUnwrapped = TripListBottom;

export default createFragmentContainer(TripListBottom, {
  list: graphql`
    fragment TripListBottom_list on BookingInterfaceConnection {
      edges {
        node {
          __typename
          id
          destinationImageUrl
        }
      }
    }
  `,
});
