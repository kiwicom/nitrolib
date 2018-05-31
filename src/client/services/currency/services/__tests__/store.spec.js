// @flow strict
import jsCookie from "js-cookie";

import * as COOKIES from "client/consts/cookies";
import * as store from "../store";

jest.mock("js-cookie");

describe("#store", () => {
  afterEach(() => {
    jsCookie.get.mockReset();
    jsCookie.set.mockReset();
  });

  test("getValue - has cookie", () => {
    jsCookie.get.mockReturnValue("czk");

    expect(store.getValue()).toBe("czk");
    expect(jsCookie.get).toBeCalledWith(COOKIES.CURRENCY);
  });

  test("getValue - has no cookie", () => {
    jsCookie.get.mockReturnValue(null);

    expect(store.getValue()).toBe(null);
    expect(jsCookie.get).toBeCalledWith(COOKIES.CURRENCY);
  });

  test("saveValue", () => {
    store.saveValue("czk");

    expect(jsCookie.set).toBeCalledWith(COOKIES.CURRENCY, "czk");
  });
});
