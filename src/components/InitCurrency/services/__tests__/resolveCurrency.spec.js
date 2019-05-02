// @flow strict
import { currencyDefault } from "../../../../records/Currency";
import resolveCurrency from "../resolveCurrency";
import currencies from "../../../../records/__mocks__/Currencies";

const available = {
  dkk: { ...currencies.dkk },
  gbp: { ...currencies.gbp },
  eur: { ...currencies.eur },
};

describe("#resolveCurrency", () => {
  test("candidate", () => {
    expect(resolveCurrency(currencies, available, "dkk")).toEqual(currencies.dkk);
  });

  test("fallback", () => {
    expect(resolveCurrency(currencies, available, "hkd")).toEqual(currencies.gbp);
  });

  test("default", () => {
    expect(resolveCurrency(currencies, available, "")).toEqual(currencyDefault);
  });

  test("first available", () => {
    expect(resolveCurrency(currencies, { dkk: available.dkk }, "")).toEqual(available.dkk);
  });
});
