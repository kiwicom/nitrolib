// @flow strict
import queryString from "query-string";
import * as R from "ramda";

import { IP as URL_IP } from "client/consts/url";

export const DEFAULT_IP = "185.86.151.11";

const getIP = (searchParams: string): string =>
  // TODO: not on production
  R.propOr(DEFAULT_IP, URL_IP, queryString.parse(searchParams));

export default getIP;
