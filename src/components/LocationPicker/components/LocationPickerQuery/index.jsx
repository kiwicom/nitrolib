// @flow strict
import * as React from "react";
import { Environment, graphql, QueryRenderer } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import Text from "../../../Text";
import NoResult from "../../primitives/NoResult";
import PickerDropDown from "../../primitives/PickerDropDown";
import LocationPickerResultList from "../LocationPickerResultList";
import type { Location } from "../../../../records/Location";

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

type Props = {|
  environment: Environment,
  queryName: "allLocations" | "holidaysLocations",
  input: string,
  value: Location | null,
  options: { locationType?: string },
  onSelect: (item: Location) => void,
|};

const LocationPickerQuery = ({
  environment,
  input,
  value,
  options,
  queryName,
  onSelect,
}: Props) => {
  const [lastResultData, setLastResultData] = React.useState(null);

  return (
    <QueryRenderer
      environment={environment}
      query={queries[queryName]}
      variables={{ input, options }}
      render={res => {
        if (res.error) {
          return (
            <Alert type="critical">
              <Text t="common.api_error" />
            </Alert>
          );
        }

        const isLoading = !res.props;
        const resultData = isLoading ? lastResultData : res.props[queryName];
        if (!isLoading) {
          setLastResultData(resultData);
        }

        // resultData can be null only while first loading
        // render nothing to prevent NoResult flickering
        if (!resultData) return null;

        // if startCursor is null it means resultData.edges is []
        if (!resultData.pageInfo.startCursor) {
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
              list={resultData}
              selectedId={value && value.id}
              onSelect={onSelect}
            />
          </PickerDropDown>
        );
      }}
    />
  );
};

export default LocationPickerQuery;
