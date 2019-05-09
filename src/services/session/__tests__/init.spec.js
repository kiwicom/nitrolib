// @flow strict
import qs from "query-string";

import init from "../init";
import handleUserId from "../services/handleUserId";
import handleAffiliateId from "../services/handleAffiliateId";
import handleSessionId from "../services/handleSessionId";
import handleUTMs from "../services/handleUTMs";

jest.mock("query-string");
jest.mock("../services/handleUserId");
jest.mock("../services/handleAffiliateId");
jest.mock("../services/handleSessionId");
jest.mock("../ids");
jest.mock("../services/handleUTMs");

describe("#init", () => {
  test("mount", () => {
    qs.parse.mockReturnValue({ userId: "kek", affilId: "bur", lol: "lmao", utm_source: "omg" });
    // $FlowExpected: Mocks
    handleUserId.mockReturnValue("userId");
    // $FlowExpected: Mocks
    handleAffiliateId.mockReturnValue({ id: "affiliate", params: {} });
    // $FlowExpected: Mocks
    handleSessionId.mockReturnValue("sessionId");
    // $FlowExpected: Mocks
    handleUTMs.mockReturnValue({ utm_source: "omg" });

    const res = init();

    expect(handleUserId).toBeCalledWith("kek");
    expect(handleAffiliateId).toBeCalledWith("bur", { lol: "lmao", utm_source: "omg" });
    expect(handleSessionId).toBeCalledWith();
    expect(handleUTMs).toBeCalledWith({ lol: "lmao", utm_source: "omg" });
    expect(res).toEqual({
      userId: "userId",
      sessionId: "sessionId",
      pageViewId: "pageViewId",
      affiliate: { id: "affiliate", params: {} },
      UTMs: { utm_source: "omg" },
    });
  });
});
