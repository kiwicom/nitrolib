// @flow strict
import * as currency from "../Currency";
import currencies from "../__mocks__/Currencies";

describe("#Currency", () => {
  test("get code", () => {
    expect(currency.getCode(currency.currencyDefault.id)).toBe("EUR");
  });

  test("get symbol", () => {
    expect(currency.getSymbol(currency.currencyDefault.format.format)).toBe("€");
  });

  test("convert", () => {
    expect(currency.convert({ ...currency.currencyDefault, rate: "1.105" }, 10)).toBe(9.05);
  });

  test("format", () => {
    expect(currency.format(currency.currencyDefault, 10)).toBe("10 €");
  });

  test("get available list", () => {
    const currencyMap = {
      eur: { ...currencies.eur },
      czk: { ...currencies.czk },
    };

    expect(currency.getAvailableList(currencyMap)).toEqual([currencyMap.czk, currencyMap.eur]);
  });
});
