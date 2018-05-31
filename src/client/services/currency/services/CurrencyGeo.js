// @flow strict
import { fetchQuery, graphql } from "relay-runtime";
import type { Environment } from "relay-runtime";

const query = graphql`
  query CurrencyGeoQuery($ip: IP!) {
    geoIP(ip: $ip) {
      isoCountryCode
    }
  }
`;

const currencyGeo = (environment: Environment, ip: ?string) =>
  fetchQuery(environment, query, { ip });

export default currencyGeo;
