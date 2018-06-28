// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import type { ReadyState } from "react-relay";

import environmentReal from "client/public/services/environment";

type Props = {|
  render: ReadyState => ?React.Element<any>,
  environment: typeof environmentReal,
|};

const GeoData = ({ render, environment }: Props) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query GeoDataQuery {
        geoIP(ip: "185.86.151.11") {
          # TODO remove the fixed IP once GraphQL is ready
          coordinates {
            lat
            lng
          }
          isoCountryCode
        }
      }
    `}
    variables={{}}
    render={render}
  />
);

GeoData.defaultProps = {
  environment: environmentReal,
};

export default GeoData;
