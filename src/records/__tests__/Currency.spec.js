// @flow strict
import * as currency from "../Currency";

describe("#Currency", () => {
  test("get code", () => {
    expect(currency.getCode(currency.currencyDefault.id)).toBe("EUR");
  });

  test("get symbol", () => {
    expect(currency.getSymbol(currency.currencyDefault.format)).toBe("€");
  });

  test("convert", () => {
    expect(currency.convert({ ...currency.currencyDefault, rate: 1.105 }, 10)).toBe(9.05);
  });

  test("format", () => {
    expect(currency.format(currency.currencyDefault, 10)).toBe("10 €");
  });

  test("get available list", () => {
    const currencyMap = {
      eur: {
        id: "eur",
        name: "Euro",
        format: "__price__ €",
        uncertainFormat: false,
        round: "2",
        enabledOnAffilId: "",
        fallback: "",
        rate: 1,
      },
      czk: {
        id: "czk",
        name: "Koruna",
        format: "__price__ Kč",
        uncertainFormat: false,
        round: "2",
        enabledOnAffilId: "",
        fallback: "",
        rate: 0.3,
      },
    };

    expect(currency.getAvailableList(currencyMap)).toEqual([currencyMap.czk, currencyMap.eur]);
  });
});
