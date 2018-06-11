// @flow strict
import jsCookie from "js-cookie";

import * as io from "../io";

jest.mock("js-cookie");

describe("#io", () => {
  beforeEach(() => {
    jsCookie.get.mockReset();
  });

  test("affiliate - in url", () => {
    expect(io.getAffiliate("a=a&affilid=test&b=b")).toBe("test");
  });

  test("affiliate - in cookie", () => {
    jsCookie.get.mockReturnValue("test");

    expect(io.getAffiliate("")).toBe("test");
  });

  test("affiliate - in url and cookie", () => {
    jsCookie.get.mockReturnValue("cookie");

    expect(io.getAffiliate("a=a&affilid=url&b=b")).toBe("url");
  });

  test("affiliate - nowhere", () => {
    expect(io.getAffiliate("")).toBe("");
  });

  test("currency - in url", () => {
    expect(io.getCurrency("a=a&currency=test&b=b")).toBe("test");
  });

  test("currency - in cookie", () => {
    jsCookie.get.mockReturnValue("test");

    expect(io.getCurrency("")).toBe("test");
  });

  test("currency - in url and cookie", () => {
    jsCookie.get.mockReturnValue("cookie");

    expect(io.getCurrency("a=a&currency=url&b=b")).toBe("url");
  });

  test("currency - nowhere", () => {
    expect(io.getCurrency("")).toBe("");
  });
});
