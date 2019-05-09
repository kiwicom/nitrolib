// @flow strict
import * as cookies from "../cookies";
import { USER_ID } from "../../../consts/cookies";
import { makeUserId } from "../ids";

const handleUserId = (fromUrl: ?string): string => {
  // URL 1st
  if (fromUrl) {
    cookies.save(USER_ID, fromUrl);
    return fromUrl;
  }

  // Cookies 2nd
  const fromCookies = cookies.load(USER_ID);
  if (fromCookies) {
    return fromCookies;
  }

  const uid = makeUserId();
  cookies.save(USER_ID, uid);
  return uid;
};

export default handleUserId;
