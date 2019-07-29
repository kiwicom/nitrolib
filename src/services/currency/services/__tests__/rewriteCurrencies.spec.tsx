import rewriteCurrencies from "../rewriteCurrencies";
import currencies from "../../../../records/__mocks__/Currencies";

const fetched = {
  eur: {
    enabledOnAffilId: ,
    fallback: ,
    format: "__price__ €",
    id: "eur",
    name: "Euro",
    rate: 1,
    precision: "2",
    uncertainFormat: false,
  },
  czk: {
    enabledOnAffilId: ,
    fallback: ,
    format: "__price__ Kč",
    id: "czk",
    name: "Koruna",
    rate: 0.3,
    precision: "2",
    uncertainFormat: false,
  },
  hkd: {
    enabledOnAffilId: ,
    fallback: "gbp",
    format: "HK$__price__",
    id: "hkd",
    name: "Hong Kong dollar",
    rate: 0.109077,
    precision: "2",
    uncertainFormat: false,
  },
  gbp: {
    id: "gbp",
    name: "British Pound Sterling",
    format: "£__price__",
    fallback: ,
    enabledOnAffilId: ["uk"],
    rate: 1.14355,
    precision: "2",
    uncertainFormat: false,
  },
};

const output = {
  eur: { ...currencies.eur },
  czk: { ...currencies.czk },
  hkd: { ...currencies.hkd },
  gbp: { ...currencies.gbp },
};

describe("#rewriteCurrencies", () => {
  it("should rewrite currencies acc to a new type", () => {
    expect(rewriteCurrencies(fetched)).toEqual(output);
  });
});
