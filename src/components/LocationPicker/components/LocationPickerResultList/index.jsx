// @flow strict
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";

import type { LocationPickerResultList_list } from "./__generated__/LocationPickerResultList_list.graphql";
import LocationPickerRow from "../LocationPickerRow";
import type { Location } from "../../../../records/Location";

type Props = {|
  list: LocationPickerResultList_list,
  selectedId: string | null,
  onSelect: (loc: Location) => void,
|};

const LocationPickerResultList = ({ list, selectedId, onSelect }: Props): React.Node[] | null =>
  list.edges
    ? list.edges
        .map(edge => edge?.node)
        .filter(Boolean)
        .map(item => (
          // $FlowExpected: Relay
          <LocationPickerRow
            item={item}
            key={item.id}
            selected={selectedId === item.id}
            onSelect={onSelect}
          />
        ))
    : null;

export default createFragmentContainer(LocationPickerResultList, {
  list: graphql`
    fragment LocationPickerResultList_list on LocationConnection {
      edges {
        node {
          id
          ...LocationPickerRow_item
        }
      }
    }
  `,
});
