// @flow strict
import * as R from "ramda";

import * as cookies from "../cookies";
import * as local from "../local";
import { AFFILIATE_ID } from "../../../consts/cookies";
import type { Affiliate } from "../../../records/Affiliate";
import { AFFILIATE_PARAMS } from "../../../consts/local";

type Query = { [key: string]: string | string[] };

const handleAffiliateId = (fromUrl: ?string, rest: Query): Affiliate | null => {
  const params = R.map(String, rest);

  // URL 1st
  if (fromUrl) {
    cookies.save(AFFILIATE_ID, fromUrl, { expires: 30 }); // FIXME maybe also to storage
    local.save(AFFILIATE_PARAMS, JSON.stringify(params));
    return { id: fromUrl, params };
  }

  // Cookies / localStorage 2nd
  const fromCookies = cookies.load(AFFILIATE_ID);
  if (fromCookies) {
    const loadedParams = local.load(AFFILIATE_PARAMS);
    return { id: fromCookies, params: loadedParams ? JSON.parse(loadedParams) : {} };
  }

  cookies.remove(AFFILIATE_ID);
  local.remove(AFFILIATE_PARAMS);
  return null;
};

export default handleAffiliateId;
