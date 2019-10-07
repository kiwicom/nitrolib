// @flow strict
import * as cookies from "../cookies";
import { USER_ID, EXPIRATION } from "../../../consts/cookies";
import { makeUserId } from "../ids";
import isUUID from "../../utils/isUUID";

const handleUserId = (fromUrl: ?string): string => {
  // URL 1st
  if (fromUrl && isUUID(String(fromUrl))) {
    cookies.save(USER_ID, fromUrl, { expires: EXPIRATION });
    return fromUrl;
  }

  // Cookies 2nd
  const fromCookies = cookies.load(USER_ID);
  if (fromCookies) {
    return fromCookies;
  }

  const uid = makeUserId();
  cookies.save(USER_ID, uid, { expires: EXPIRATION });
  return uid;
};

export default handleUserId;
