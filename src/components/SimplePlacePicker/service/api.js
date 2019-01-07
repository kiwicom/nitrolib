// @flow strict
import { handleJSON } from "../../../services/fetch/handlers";
import { JSON_BOTH } from "../../../services/fetch/headers";
import type { Meta } from "../records/Locations";
import type { LocationItem } from "../records/LocationItem";
import config from "../../../consts/config";

type LocationsQuery = {|
  limit: number,
  locale: string,
  term: string,
|};

type Response = {|
  locations: Array<LocationItem>,
  meta: Meta,
|};

const getLocations = ({ limit, locale, term }: LocationsQuery): Promise<Response> =>
  fetch(`${config.apiLocations}?limit=${limit}&locale=${locale}&term=${term}&X-Client=frontend`, {
    headers: JSON_BOTH,
  }).then(handleJSON);

export default getLocations;
