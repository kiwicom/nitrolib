// @flow strict
import * as R from "ramda";

import { countryDefault } from "client/records/Country";
import type { Countries, Country } from "client/records/Country";
import type { GeoDataQueryResponse } from "client/components/GeoData/__generated__/GeoDataQuery.graphql";

const getGeoIPCountry = (
  data: ?GeoDataQueryResponse,
  countries: Countries,
  defaultValue: ?Country = countryDefault,
) =>
  data && data.geoIP && typeof data.geoIP.isoCountryCode === "string"
    ? R.propOr(defaultValue, data.geoIP.isoCountryCode.toLowerCase(), countries)
    : defaultValue;

export default getGeoIPCountry;
