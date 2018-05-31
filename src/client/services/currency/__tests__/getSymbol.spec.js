// @flow strict
import { currencyDefault } from "client/records/Currency";
import getSymbol from "../getSymbol";

describe("#getSymbol", () => {
  test("getSymbol", () => {
    expect(getSymbol(currencyDefault)).toBe("€");
  });
});
