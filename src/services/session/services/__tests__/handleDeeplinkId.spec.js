// @flow strict
import handleDeeplinkId from "../handleDeeplinkId";
import * as session from "../../session";
import { DEEPLINK_ID } from "../../../../consts/session";

jest.mock("../../../../services/session/session");
jest.mock("../../../../services/session/ids");

describe("#handleDeeplinkId", () => {
  beforeEach(() => {
    session.load.mockClear();
    session.save.mockClear();
  });

  test("url", () => {
    const res = handleDeeplinkId("lol");

    expect(res).toBe("lol");
    expect(session.save).toBeCalledWith(DEEPLINK_ID, "lol");
  });

  test("session", () => {
    session.load.mockReturnValue("lol");

    const res = handleDeeplinkId();

    expect(res).toBe("lol");
    expect(session.load).toBeCalledWith(DEEPLINK_ID);
  });

  test("none", () => {
    session.load.mockReturnValue(null);

    const res = handleDeeplinkId(null);

    expect(res).toBe("");
    expect(session.save).not.toBeCalled();
  });
});
