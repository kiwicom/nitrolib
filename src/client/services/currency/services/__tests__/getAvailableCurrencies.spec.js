// @flow strict
import getAvailableCurrencies from "../getAvailableCurrencies";

const currencies = {
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
  gbp: {
    id: "gbp",
    name: "British Pound Sterling",
    format: "£__price__",
    uncertainFormat: false,
    round: "2",
    enabledOnAffilId: ["uk"],
    fallback: "",
    rate: 1.14355,
  },
};

describe("#getAvailableCurrencies", () => {
  test("no affiliate", () => {
    expect(getAvailableCurrencies(currencies, "")).toEqual({
      eur: currencies.eur,
    });
  });

  test("matching affiliate", () => {
    expect(getAvailableCurrencies(currencies, "UK")).toEqual(currencies);
  });

  test("containing affiliate", () => {
    expect(getAvailableCurrencies(currencies, "UK-NEW")).toEqual(currencies);
  });

  test("not matching affiliate", () => {
    expect(getAvailableCurrencies(currencies, "test")).toEqual({
      eur: currencies.eur,
    });
  });
});
