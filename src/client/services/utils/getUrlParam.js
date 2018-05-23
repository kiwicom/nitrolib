// @flow strict
import queryString from "query-string";
import * as R from "ramda";

const getUrlParam = (key: string): ?string =>
  typeof window !== "undefined" && window.location.search
    ? R.propOr(null, key, queryString.parse(window.location.search))
    : null;

export default getUrlParam;
