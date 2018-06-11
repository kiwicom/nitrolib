// @flow strict
import { DEV_IP } from "client/consts/url";
import getIP, { SENTINEL_IP } from "../getIP";

describe("#getIP", () => {
  test("not production", () => {
    expect(getIP("a=a&b=b", true)).toBe(SENTINEL_IP);
  });

  test("production, unset", () => {
    expect(getIP("a=a&b=b", false)).toBe("");
  });

  test("production, set", () => {
    expect(getIP(`a=a&${DEV_IP}=123.123.123.123&b=b`, false)).toBe("123.123.123.123");
  });
});
