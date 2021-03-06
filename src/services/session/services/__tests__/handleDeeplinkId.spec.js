// @flow strict
import handleDeeplinkId from "../handleDeeplinkId";
import * as session from "../../session";
import { DEEPLINK_ID } from "../../../../consts/session";

jest.mock("../../../../services/session/session");
jest.mock("../../../../services/session/ids");

describe("#handleDeeplinkId", () => {
  beforeEach(() => {
    // $FlowExpected: jest bug
    session.load.mockClear();
    // $FlowExpected: jest bug
    session.save.mockClear();
  });

  test("url", () => {
    const res = handleDeeplinkId("lol");

    expect(res).toBe("lol");
    expect(session.save).toBeCalledWith(DEEPLINK_ID, "lol");
  });

  test("session", () => {
    // $FlowExpected: jest bug
    session.load.mockReturnValue("lol");

    const res = handleDeeplinkId();

    expect(res).toBe("lol");
    expect(session.load).toBeCalledWith(DEEPLINK_ID);
  });

  test("none", () => {
    // $FlowExpected: jest bug
    session.load.mockReturnValue(null);

    const res = handleDeeplinkId(null);

    expect(res).toBe("");
    expect(session.save).not.toBeCalled();
  });
});
