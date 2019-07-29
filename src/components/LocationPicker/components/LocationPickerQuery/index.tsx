import * as React from "react";
import { graphql, QueryRenderer } from "@kiwicom/relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import Text from "../../../Text";
import NoResult from "../../primitives/NoResult";
import PickerDropDown from "../../primitives/PickerDropDown";
import LocationPickerResultList from "../LocationPickerResultList";
import { Location } from "../../../../records/Location";

const queries = {
  allLocations: graphql`
    query LocationPickerQuery($input: String!, $options: LocationsOptionsInput) {
      allLocations(last: 50, search: $input, options: $options) {
        ...LocationPickerResultList_list
        pageInfo {
          startCursor
        }
      }
    }
  `,
  holidaysLocations: graphql`
    query LocationPickerQueryHolidaysQuery($input: String!) {
      holidaysLocations(last: 50, search: $input) {
        ...LocationPickerResultList_list
        pageInfo {
          startCursor
        }
      }
    }
  `,
};

type Props = {
  queryName: "allLocations" | "holidaysLocations",
  input: string,
  value: Location | null,
  options: { locationType?: string },
  onSelect: (item: Location) => void,
};

const handleResponse = (res, queryName, value, onSelect) => {
  if (!res[queryName].pageInfo.startCursor) {
    return (
      <NoResult>
        {queryName === "allLocations" ? (
          <Text t="forms.places_no_results" />
        ) : (
          <Text t="forms.places_no_results_no_iata" />
        )}
      </NoResult>
    );
  }

  return (
    <PickerDropDown>
      <LocationPickerResultList
        list={res[queryName]}
        selectedId={value && value.id}
        onSelect={onSelect}
      />
    </PickerDropDown>
  );
};

const LocationPickerQuery = ({ input, value, options, queryName, onSelect }: Props) => (
  <QueryRenderer
    clientID="nitro"
    query={queries[queryName]}
    variables={{ input, options }}
    onSystemError={() => (
      <Alert type="critical">
        <Text t="common.api_error" />
      </Alert>
    )}
    onLoading={() => null}
    onResponse={res => handleResponse(res, queryName, value, onSelect)}
  />
);

export default LocationPickerQuery;
