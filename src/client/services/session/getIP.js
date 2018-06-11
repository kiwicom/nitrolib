// @flow strict
import queryString from "query-string";

import { DEV_IP } from "client/consts/url";
import { DEV } from "client/consts/env";

export const SENTINEL_IP = "185.86.151.11";

function getIP(query: string, dev: boolean = DEV): string {
  if (dev) {
    return SENTINEL_IP;
  }

  return queryString.parse(query)[DEV_IP] || "";
}

export default getIP;
