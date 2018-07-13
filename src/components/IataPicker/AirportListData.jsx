// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";

import environmentReal from "../../services/environment";
import AirportList from "./AirportList";

type Props = {|
  value: string,
  onSelect: (id: string) => void,
  environment: typeof environmentReal,
|};

const AirportListData = ({ value, onSelect, environment }: Props) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query AirportListDataQuery($input: String!) {
        allLocations(search: $input, options: { locationType: airport }) {
          ...AirportList_list
        }
      }
    `}
    variables={{ input: value }}
    render={res => {
      if (res.error) {
        // TODO <Alert />
        return <span>Error :(</span>;
      }

      if (!res.props) {
        return null;
      }

      return <AirportList list={res.props.allLocations} onSelect={onSelect} />;
    }}
  />
);

AirportListData.defaultProps = {
  environment: environmentReal,
};

export default AirportListData;