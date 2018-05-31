// @flow strict
import jsCookie from "js-cookie";
import queryString from "query-string";
import * as R from "ramda";

import { AFFILIATE as URL_AFFILIATE } from "client/consts/url";
import { AFFILIATE as COOKIE_AFFILIATE } from "client/consts/cookies";

const getAffiliate = (searchParams: string): string =>
  R.propOr(jsCookie.get(COOKIE_AFFILIATE), URL_AFFILIATE, queryString.parse(searchParams)) || "";

export default getAffiliate;
