// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import qs from "query-string";

import InitSession from "../index";
import handleUserId from "../services/handleUserId";
import handleAffiliateId from "../services/handleAffiliateId";
import handleSessionId from "../services/handleSessionId";
import handleUTMs from "../services/handleUTMs";

jest.mock("query-string");
jest.mock("../services/handleUserId");
jest.mock("../services/handleAffiliateId");
jest.mock("../services/handleSessionId");
jest.mock("../../../services/session/ids");
jest.mock("../services/handleUTMs");

describe("#InitSession", () => {
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

    const fn = jest.fn().mockReturnValue("kek");
    shallow(<InitSession>{fn}</InitSession>);

    expect(handleUserId).toBeCalledWith("kek");
    expect(handleAffiliateId).toBeCalledWith("bur", { lol: "lmao", utm_source: "omg" });
    expect(handleSessionId).toBeCalledWith();
    expect(handleUTMs).toBeCalledWith({ lol: "lmao", utm_source: "omg" });
    expect(fn).toBeCalledWith({
      userId: "userId",
      sessionId: "sessionId",
      pageViewId: "pageViewId",
      affiliate: { id: "affiliate", params: {} },
      UTMs: { utm_source: "omg" },
    });
  });
});
