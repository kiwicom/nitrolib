// @flow strict
import jsCookie from "js-cookie";
import queryString from "query-string";

import * as url from "client/consts/url";
import * as cookies from "client/consts/cookies";

export const getAffiliate = (query: string): string =>
  queryString.parse(query)[url.AFFILIATE] || jsCookie.get(cookies.AFFILIATE) || "";

export const getCurrency = (query: string): string =>
  queryString.parse(query)[url.CURRENCY] || jsCookie.get(cookies.CURRENCY) || "";
