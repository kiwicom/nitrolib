import * as session from "../session";
import { makeSessionId } from "../ids";
import { SESSION_ID } from "../../../consts/session";

const handleSessionId = (): string => {
  // Storage 1st
  const fromStorage = session.load(SESSION_ID);
  if (fromStorage) {
    return fromStorage;
  }

  const sid = makeSessionId();
  session.save(SESSION_ID, sid);
  return sid;
};

export default handleSessionId;
