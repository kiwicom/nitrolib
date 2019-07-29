import qs from "query-string";

import init from "../init";
import handleUserId from "../services/handleUserId";
import handleAffiliateId from "../services/handleAffiliateId";
import handleSessionId from "../services/handleSessionId";
import handleDeeplinkId from "../services/handleDeeplinkId";
import handleUTMs from "../services/handleUTMs";

jest.mock("query-string");
jest.mock("../services/handleUserId");
jest.mock("../services/handleAffiliateId");
jest.mock("../services/handleSessionId");
jest.mock("../ids");
jest.mock("../services/handleDeeplinkId");
jest.mock("../services/handleUTMs");

describe("#init", () => {
  test("mount", () => {
    // $FlowExpected: jest bug
    qs.parse.mockReturnValue({
      // UUID v4 string
      userId: "84b01832-ea96-43b5-bf45-045a22fa46a9",
      affilId: "bur",
      lol: "lmao",
      deeplinkId: "ugh",
      utm_source: "omg",
    });
    // $FlowExpected: Mocks
    handleUserId.mockReturnValue("userId");
    // $FlowExpected: Mocks
    handleAffiliateId.mockReturnValue({ id: "affiliate", params: {} });
    // $FlowExpected: Mocks
    handleSessionId.mockReturnValue("sessionId");
    // $FlowExpected: Mocks
    handleDeeplinkId.mockReturnValue("deeplinkId");
    // $FlowExpected: Mocks
    handleUTMs.mockReturnValue({ utm_source: "omg" });

    const res = init();

    expect(handleUserId).toBeCalledWith("84b01832-ea96-43b5-bf45-045a22fa46a9");
    expect(handleAffiliateId).toBeCalledWith("bur", { lol: "lmao", utm_source: "omg" });
    expect(handleSessionId).toBeCalledWith();
    expect(handleDeeplinkId).toBeCalledWith("ugh");
    expect(handleUTMs).toBeCalledWith({ lol: "lmao", utm_source: "omg" });
    expect(res).toEqual({
      userId: "userId",
      sessionId: "sessionId",
      pageViewId: "pageViewId",
      deeplinkId: "deeplinkId",
      affiliate: { id: "affiliate", params: {} },
      UTMs: { utm_source: "omg" },
    });
  });
});
