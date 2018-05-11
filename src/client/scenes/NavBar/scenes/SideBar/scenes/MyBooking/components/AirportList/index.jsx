// @flow strict
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";

import AirportResult from "client/components/AirportResult";
import type { AirportList_list } from "./__generated__/AirportList_list.graphql";

type Props = {|
  list: AirportList_list,
  onSelect: (id: string) => void,
|};

const AirportList = (props: Props) =>
  props.list.edges &&
  props.list.edges
    .map(edge => edge && edge.node)
    .filter(Boolean)
    .map(item => (
      // $FlowExpected - Relay type issue
      <AirportResult key={item.locationId} item={item} onClick={props.onSelect} />
    ));

export default createFragmentContainer(
  AirportList,
  graphql`
    fragment AirportList_list on LocationConnection {
      edges {
        node {
          locationId
          ...AirportResult_item
        }
      }
    }
  `,
);
