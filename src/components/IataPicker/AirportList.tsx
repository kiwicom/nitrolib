import * as React from "react";
import { createFragmentContainer, graphql } from "@kiwicom/relay";

import AirportResult from "../AirportResult";
import { AirportList_list } from "./__generated__/AirportList_list.graphql";

type Props = {
  list: AirportList_list,
  onSelect: (id: string) => void,
};

const AirportList = ({ list, onSelect }: Props): React.ReactNode[] | null =>
  !list.edges
    ? null
    : list.edges
        .map(edge => edge && edge.node)
        .filter(Boolean)
        .map(item => (
          // $FlowExpected: Relay type issue
          <AirportResult key={item.locationId} item={item} onClick={onSelect} />
        ));

export default createFragmentContainer(AirportList, {
  list: graphql`
    fragment AirportList_list on LocationConnection {
      edges {
        node {
          locationId
          ...AirportResult_item
        }
      }
    }
  `,
});
