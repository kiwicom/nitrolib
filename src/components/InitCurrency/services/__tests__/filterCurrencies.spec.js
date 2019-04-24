// @flow strict
import filterCurrencies from "../filterCurrencies";
import currencies from "../../../../records/__mocks__/Currencies";

const output = {
  eur: { ...currencies.eur },
  gbp: { ...currencies.gbp },
};

describe("#filterCurrencies", () => {
  test("no affiliate", () => {
    expect(filterCurrencies("", ["eur", "gbp"], currencies)).toEqual({
      eur: currencies.eur,
    });
  });

  test("matching affiliate", () => {
    expect(filterCurrencies("UK", ["eur", "gbp"], currencies)).toEqual(output);
  });

  test("containing affiliate", () => {
    expect(filterCurrencies("UK-NEW", ["eur", "gbp"], currencies)).toEqual(output);
  });

  test("not matching affiliate", () => {
    expect(filterCurrencies("test", ["eur", "gbp"], currencies)).toEqual({
      eur: output.eur,
    });
  });

  test("not in whitelist", () => {
    expect(filterCurrencies("", ["eur"], currencies)).toEqual({
      eur: output.eur,
    });
  });
});
