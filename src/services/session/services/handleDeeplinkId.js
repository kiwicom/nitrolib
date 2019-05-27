// @flow strict
import * as session from "../session";
import { DEEPLINK_ID } from "../../../consts/session";

const handleUserId = (fromUrl: ?string): string => {
  // URL 1st
  if (fromUrl) {
    session.save(DEEPLINK_ID, fromUrl);
    return fromUrl;
  }

  // Session 2nd
  const fromSession = session.load(DEEPLINK_ID);
  if (fromSession) {
    return fromSession;
  }

  return "";
};

export default handleUserId;
