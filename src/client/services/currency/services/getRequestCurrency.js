// @flow strict
import queryString from "query-string";

import { CURRENCY as URL_CURRENCY } from "client/consts/url";
import * as store from "./store";

const getRequestCurrency = (search: string) =>
  queryString.parse(search)[URL_CURRENCY] || store.getValue() || null;

export default getRequestCurrency;
