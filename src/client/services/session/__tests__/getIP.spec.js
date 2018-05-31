// @flow strict
import getIP, { DEFAULT_IP } from "../getIP";

describe("#getIP", () => {
  test("none set", () => {
    expect(getIP("a=a&ip=123.123.123.123&b=b")).toBe(DEFAULT_IP);
  });

  test("set in url", () => {
    expect(getIP("a=a&node_override_ip=123.123.123.123&b=b")).toBe("123.123.123.123");
  });
});
