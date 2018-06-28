// @flow strict
import { currencyDefault } from "client/public/records/Currency";
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
  test("candidate", () => {
    expect(resolveCurrency(all, available, "dkk")).toEqual(all.dkk);
  });

  test("fallback", () => {
    expect(resolveCurrency(all, available, "hkd")).toEqual(all.gbp);
  });

  test("default", () => {
    expect(resolveCurrency(all, available, "")).toEqual(currencyDefault);
  });

  test("first available", () => {
    expect(resolveCurrency(all, { dkk: available.dkk }, "")).toEqual(available.dkk);
  });
});
