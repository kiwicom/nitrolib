// @flow strict
import handleUserId from "../handleUserId";
import * as cookies from "../../cookies";
import { USER_ID } from "../../../../consts/cookies";

jest.mock("../../../../services/session/cookies");
jest.mock("../../../../services/session/ids");

describe("#handleUserId", () => {
  test("url", () => {
    const res = handleUserId("84b01832-ea96-43b5-bf45-045a22fa46a9");

    expect(res).toBe("84b01832-ea96-43b5-bf45-045a22fa46a9");
    expect(cookies.save).toBeCalledWith(USER_ID, "84b01832-ea96-43b5-bf45-045a22fa46a9");
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
