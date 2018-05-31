// @flow strict
import jsCookie from "js-cookie";

import getRequestCurrency from "../getRequestCurrency";

jest.mock("js-cookie");

describe("#getRequestCurrency", () => {
  afterEach(() => {
    // $FlowIssue
    jsCookie.get.mockReset();
  });

  test("from query", () => {
    // $FlowIssue
    jsCookie.get.mockReturnValue(null);

    expect(getRequestCurrency("a=a&currency=CZK")).toBe("CZK");
  });

  test("from cookie", () => {
    // $FlowIssue
    jsCookie.get.mockReturnValue("CZK");

    expect(getRequestCurrency("a=a")).toBe("CZK");
    expect(jsCookie.get).toBeCalledWith("preferred_currency");
  });

  test("from both", () => {
    // $FlowIssue
    jsCookie.get.mockReturnValue("CZK");

    expect(getRequestCurrency("a=a&currency=EUR")).toBe("EUR");
  });

  test("none set", () => {
    // $FlowIssue
    jsCookie.get.mockReturnValue(null);

    expect(getRequestCurrency("a=a")).toBe(null);
  });
});
