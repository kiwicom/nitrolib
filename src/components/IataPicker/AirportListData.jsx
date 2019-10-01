// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "@kiwicom/relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import AirportList from "./AirportList";
import Translate from "../Translate";

type Props = {|
  value: string,
  onSelect: (id: string) => void,
|};

const AirportListData = ({ value, onSelect }: Props) => (
  <QueryRenderer
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

export default AirportListData;
