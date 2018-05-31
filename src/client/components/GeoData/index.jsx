// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import type { ReadyState } from "react-relay";

import environment from "client/services/environment";

type Props = {|
  render: ReadyState => ?React.Element<any>,
  environment: typeof environment,
|};

const Index = (props: Props) => (
  <QueryRenderer
    environment={props.environment}
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
    render={props.render}
  />
);

Index.defaultProps = {
  environment,
};

export default Index;
