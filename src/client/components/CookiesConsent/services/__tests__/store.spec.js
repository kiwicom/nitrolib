// @flow strict
import jsCookie from "js-cookie";

import * as COOKIES from "client/consts/cookies";

import * as store from "../store";

jest.mock("js-cookie");

describe("#store", () => {
  test("isAccepted - has cookie", () => {
    jsCookie.get.mockReturnValue(true);

    expect(store.isAccepted()).toBe(true);
    expect(jsCookie.get).toBeCalledWith(COOKIES.COOKIE_CONSENT_KEY);
  });

  test("isAccepted - has no cookie", () => {
    jsCookie.get.mockReturnValue(false);

    expect(store.isAccepted()).toBe(false);
    expect(jsCookie.get).toBeCalledWith(COOKIES.COOKIE_CONSENT_KEY);
  });

  test("saveAccepted", () => {
    store.saveAccepted();

    expect(jsCookie.set).toBeCalledWith(COOKIES.COOKIE_CONSENT_KEY, COOKIES.COOKIE_CONSENT_VALUE);
  });
});
