// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";

import environment from "client/services/environment";
import AirportList from "../AirportList/index";

type Props = {|
  value: string,
  onSelect: (id: string) => void,
|};

const AirportListData = (props: Props) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query AirportListDataQuery($input: String!) {
        allLocations(search: $input, options: { locationType: airport }) {
          ...AirportList_list
        }
      }
    `}
    variables={{ input: props.value }}
    render={res => {
      if (res.error) {
        // TODO <Alert />
        return <span>Error :(</span>;
      }

      if (!res.props) {
        return null;
      }

      return <AirportList list={res.props.allLocations} onSelect={props.onSelect} />;
    }}
  />
);

export default AirportListData;
