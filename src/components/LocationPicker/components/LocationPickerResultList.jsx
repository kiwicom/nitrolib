// @flow
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";

import type { LocationPickerResultList_list } from "./__generated__/LocationPickerResultList_list.graphql";
import type { LocationPickerRow_item } from "./__generated__/LocationPickerRow_item.graphql";
import LocationPickerRow from "./LocationPickerRow";

type Props = {|
  handleSelect: (arg: LocationPickerRow_item, index: number) => void,
  selectedIndex: number,
  list: LocationPickerResultList_list,
  handleLength: (arg: number) => void,
|};

const LocationPickerResultList = ({
  list,
  handleSelect,
  handleLength,
  selectedIndex,
}: Props): React.Node[] | null =>
  !list.edges
    ? null
    : list.edges
        .map(edge => edge && edge.node)
        .filter(Boolean)
        .map((item, index) => {
          const { id } = item;
          const length = list && list.edges && list.edges.length;
          handleLength(length || 0);
          return (
            /* $FlowExpected: TODO describe */
            <LocationPickerRow
              index={index}
              key={id}
              handleSelect={handleSelect}
              selected={selectedIndex === index}
              item={item}
            />
          );
        });

export default createFragmentContainer(
  LocationPickerResultList,
  graphql`
    fragment LocationPickerResultList_list on LocationConnection {
      edges {
        node {
          id
          type
          code
          name
          country {
            code
            name
          }
          ...LocationPickerRow_item
        }
      }
    }
  `,
);
