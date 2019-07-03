// @flow strict
import handleUserId from "../handleUserId";
import * as cookies from "../../cookies";
import { USER_ID } from "../../../../consts/cookies";

jest.mock("../../../../services/session/cookies");
jest.mock("../../../../services/session/ids");

describe("#handleUserId", () => {
  test("url", () => {
    const res = handleUserId("lol");

    expect(res).toBe("lol");
    expect(cookies.save).toBeCalledWith(USER_ID, "lol");
  });

  test("cookies", () => {
    // $FlowExpected: jest bug
    cookies.load.mockReturnValue("lol");

    const res = handleUserId();

    expect(res).toBe("lol");
    expect(cookies.load).toBeCalledWith(USER_ID);
  });

  test("none", () => {
    // $FlowExpected: jest bug
    cookies.load.mockReturnValue(null);

    const res = handleUserId(null);

    expect(res).toBe("userId");
    expect(cookies.save).toBeCalledWith(USER_ID, "userId");
  });
});
