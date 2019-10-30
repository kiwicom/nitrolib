// @flow strict
import cookieSettings from "../cookieSettings";
import { COOKIES_SETTINGS } from "../../../consts/cookies";

describe("#cookieSettings", () => {
  test("none", () => {
    expect(cookieSettings({})).toEqual({
      performance: true,
      marketing: true,
    });
  });

  test("performance", () => {
    expect(cookieSettings({ [COOKIES_SETTINGS]: "performance=1,marketing=0" })).toEqual({
      performance: true,
      marketing: false,
    });
  });

  test("marketing", () => {
    expect(cookieSettings({ [COOKIES_SETTINGS]: "performance=0,marketing=1" })).toEqual({
      performance: false,
      marketing: true,
    });
  });

  test("both", () => {
    expect(cookieSettings({ [COOKIES_SETTINGS]: "performance=1,marketing=1" })).toEqual({
      performance: true,
      marketing: true,
    });
  });
});
