// @flow strict
import * as storage from "../../../services/session/storage";
import { makeSessionId } from "../../../services/session/ids";
import { SESSION_ID } from "../../../consts/storage";

const handleSessionId = (): string => {
  // Storage 1nd
  const fromStorage = storage.loadSession(SESSION_ID);
  if (fromStorage) {
    return fromStorage;
  }

  const sid = makeSessionId();
  storage.saveSession(SESSION_ID, sid);
  return sid;
};

export default handleSessionId;
