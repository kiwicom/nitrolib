// @flow strict
import * as currency from "public/records/Currency";

describe("#Currency", () => {
  test("get code", () => {
    expect(currency.getCode(currency.currencyDefault.id)).toBe("EUR");
  });

  test("get symbol", () => {
    expect(currency.getSymbol(currency.currencyDefault.format)).toBe("€");
  });

  test("format", () => {
    expect(currency.format(currency.currencyDefault, 10)).toBe("10 €");
  });

  test("format with rate", () => {
    expect(currency.format({ ...currency.currencyDefault, rate: 0.8 }, 10)).toBe("8 €");
  });
});
