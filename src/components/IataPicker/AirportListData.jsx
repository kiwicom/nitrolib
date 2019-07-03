// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "@kiwicom/relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import environmentReal from "../../services/environment";
import AirportList from "./AirportList";
import Translate from "../Translate";

type Props = {|
  value: string,
  env: typeof environmentReal,
  onSelect: (id: string) => void,
|};

const AirportListData = ({ value, onSelect, env }: Props) => (
  <QueryRenderer
    environment={env}
    query={graphql`
      query AirportListDataQuery($input: String!) {
        allLocations(search: $input, options: { locationType: airport }) {
          ...AirportList_list
        }
      }
    `}
    variables={{ input: value }}
    onSystemError={() => (
      <Alert type="critical">
        <Translate t="common.api_error" />
      </Alert>
    )}
    onLoading={() => null}
    onResponse={res => <AirportList list={res.allLocations} onSelect={onSelect} />}
  />
);

AirportListData.defaultProps = {
  env: environmentReal,
};

export default AirportListData;
