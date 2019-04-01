// @flow strict
import handleSessionId from "../handleSessionId";
import * as storage from "../../../../services/session/storage";
import { SESSION_ID } from "../../../../consts/storage";

jest.mock("../../../../services/session/storage");
jest.mock("../../../../services/session/ids");

describe("#handleSessionId", () => {
  test("storage", () => {
    storage.loadSession.mockReturnValue("lol");

    const res = handleSessionId();

    expect(res).toBe("lol");
    expect(storage.loadSession).toBeCalledWith(SESSION_ID);
  });

  test("none", () => {
    storage.loadSession.mockReturnValue(null);

    const res = handleSessionId();

    expect(res).toBe("sessionId");
    expect(storage.saveSession).toBeCalledWith(SESSION_ID, "sessionId");
  });
});
