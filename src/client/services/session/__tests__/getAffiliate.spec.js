// @flow strict
import jsCookie from "js-cookie";

import getAffiliate from "../getAffiliate";

jest.mock("js-cookie");

describe("#getAffiliate", () => {
  afterEach(() => {
    jsCookie.get.mockReset();
  });

  test("in url", () => {
    expect(getAffiliate("a=a&affilid=test&b=b")).toBe("test");
  });

  test("in cookie", () => {
    jsCookie.get.mockReturnValue("test");

    expect(getAffiliate("")).toBe("test");
  });

  test("in url and cookie", () => {
    jsCookie.get.mockReturnValue("cookie");

    expect(getAffiliate("a=a&affilid=url&b=b")).toBe("url");
  });

  test("nowhere", () => {
    expect(getAffiliate("")).toBe("");
  });
});
