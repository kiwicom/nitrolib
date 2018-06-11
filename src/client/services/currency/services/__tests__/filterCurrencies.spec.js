// @flow strict
import filterCurrencies from "../filterCurrencies";

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

describe("#filterCurrencies", () => {
  test("no affiliate", () => {
    expect(filterCurrencies("", ["eur", "gbp"], currencies)).toEqual({
      eur: currencies.eur,
    });
  });

  test("matching affiliate", () => {
    expect(filterCurrencies("UK", ["eur", "gbp"], currencies)).toEqual(currencies);
  });

  test("containing affiliate", () => {
    expect(filterCurrencies("UK-NEW", ["eur", "gbp"], currencies)).toEqual(currencies);
  });

  test("not matching affiliate", () => {
    expect(filterCurrencies("test", ["eur", "gbp"], currencies)).toEqual({
      eur: currencies.eur,
    });
  });

  test("not in whitelist", () => {
    expect(filterCurrencies("", ["eur"], currencies)).toEqual({
      eur: currencies.eur,
    });
  });
});
