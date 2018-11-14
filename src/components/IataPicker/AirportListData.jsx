// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import environmentReal from "../../services/environment";
import AirportList from "./AirportList";
import Translate from "../Translate";

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
        return (
          <Alert type="critical">
            <Translate t={__("common.api_error")} />
          </Alert>
        );
      }

      if (!res.props || !res.props.allLocations) {
        return null;
      }

      // $FlowExpected: TODO describe
      return <AirportList list={res.props.allLocations} onSelect={onSelect} />;
    }}
  />
);

AirportListData.defaultProps = {
  environment: environmentReal,
};

export default AirportListData;
