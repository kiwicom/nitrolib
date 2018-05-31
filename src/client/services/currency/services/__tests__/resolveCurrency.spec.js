// @flow strict
import { currencyDefault } from "client/records/Currency";
import resolveCurrency from "../resolveCurrency";

const all = {
  // available 1
  dkk: {
    id: "dkk",
    name: "Danish Krone",
    format: "__price__ kr",
    uncertainFormat: true,
    round: "0",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.13434,
  },
  // available 2
  gbp: {
    id: "gbp",
    name: "British Pound Sterling",
    format: "£__price__",
    uncertainFormat: false,
    round: "2",
    enabledOnAffilId: "",
    fallback: "",
    rate: 1.14355,
  },
  // available, default
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
  // not available, no fallback
  czk: {
    id: "czk",
    name: "Czech Republic Koruna",
    format: "__price__ Kč",
    uncertainFormat: false,
    round: "0",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.0387945,
  },
  // not available, available fallback
  hkd: {
    id: "hkd",
    name: "Hong Kong dollar",
    format: "HK$__price__",
    uncertainFormat: false,
    round: "0",
    enabledOnAffilId: "AFFIL",
    fallback: "gbp",
    rate: 0.109077,
  },
  // not available, not available fallback
  huf: {
    id: "huf",
    name: "Hungarian Forint",
    format: "__price__ Ft",
    uncertainFormat: false,
    round: "0",
    enabledOnAffilId: "AFFIL",
    fallback: "czk",
    rate: 0.00312772,
  },
};

const available = {
  dkk: {
    id: "dkk",
    name: "Danish Krone",
    format: "__price__ kr",
    uncertainFormat: true,
    round: "0",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.13434,
  },
  gbp: {
    id: "gbp",
    name: "British Pound Sterling",
    format: "£__price__",
    uncertainFormat: false,
    round: "2",
    enabledOnAffilId: "",
    fallback: "",
    rate: 1.14355,
  },
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
};

describe("#resolveCurrency", () => {
  test("no candidates", () => {
    expect(resolveCurrency(all, available, [null, "", undefined])).toEqual(currencyDefault);
  });

  test("valid first truthy candidate", () => {
    expect(resolveCurrency(all, available, [null, "", undefined, "DKK", "GBP"])).toEqual(all.dkk);
  });

  test("unknown candidate", () => {
    expect(resolveCurrency(all, available, ["TST"])).toEqual(all.dkk);
  });

  test("candidate not in available", () => {
    expect(resolveCurrency(all, available, ["CZK"])).toEqual(currencyDefault);
  });

  test("fallback to available", () => {
    expect(resolveCurrency(all, available, ["hkd"])).toEqual(all.gbp);
  });

  test("fallback to not available", () => {
    expect(resolveCurrency(all, available, ["huf"])).toEqual(currencyDefault);
  });
});
