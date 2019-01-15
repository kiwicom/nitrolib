// @flow
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";

import type { LocationPickerResultList_list } from "./__generated__/LocationPickerResultList_list.graphql";
import type { LocationPickerRow_item } from "./__generated__/LocationPickerRow_item.graphql";
import LocationPickerRow from "./LocationPickerRow";

type Props = {|
  handleSelect: (arg: LocationPickerRow_item, index: number) => void,
  selectedIndex: number,
  handleResults: (arg: Array<LocationPickerRow_item>) => void,
  list: LocationPickerResultList_list,
|};

const LocationPickerResultList = ({
  list,
  handleSelect,
  handleResults,
  selectedIndex,
}: Props): React.Node[] | null =>
  list && list.edges
    ? list.edges
        .map(edge => edge && edge.node)
        .filter(Boolean)
        .map((item, index) => {
          const { id } = item;
          // Boris help ˆ__ˆ
          /* $FlowExpected: TODO describe */
          handleResults((list && list.edges && list.edges.map(edge => edge && edge.node)) || []);
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
        })
    : null;

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
