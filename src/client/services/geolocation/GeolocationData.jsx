// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import type { ReadyState } from "react-relay";

import environment from "client/services/environment";

type Props = {|
  ip: string,
  render: ReadyState => ?React.Element<any>,
  environment: typeof environment,
|};

const GeolocationData = (props: Props) => (
  <QueryRenderer
    environment={props.environment}
    query={graphql`
      query GeolocationDataQuery($ip: IP!) {
        geoIP(ip: $ip) {
          coordinates {
            lat
            lng
          }
          isoCountryCode
        }
      }
    `}
    variables={{ ip: props.ip }}
    render={props.render}
  />
);

GeolocationData.defaultProps = {
  environment,
};

export default GeolocationData;
