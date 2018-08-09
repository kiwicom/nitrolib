// @flow strict
import getRecommended from "../getRecommended";

const currencies = {
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
  usd: {
    id: "usd",
    name: "US Dollar",
    format: "$ __price__",
    uncertainFormat: true,
    round: "2",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.855903,
  },
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
  aud: {
    id: "aud",
    name: "Australian Dollar",
    format: "$ __price__",
    uncertainFormat: true,
    round: "2",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.653178,
  },
};

const mostUsed = ["usd", "eur", "gbp", "aud", "sek", "dkk"];

describe("#getRecommended", () => {
  test("no country, no language", () => {
    expect(getRecommended("", "", mostUsed, currencies)).toEqual([
      currencies.usd,
      currencies.eur,
      currencies.gbp,
      currencies.aud,
    ]);
  });

  test("with country and language", () => {
    expect(getRecommended("huf", "gbp", mostUsed, currencies)).toEqual([
      currencies.huf,
      currencies.gbp,
      currencies.usd,
      currencies.eur,
    ]);
  });

  test("with identical country and language", () => {
    expect(getRecommended("gbp", "gbp", mostUsed, currencies)).toEqual([
      currencies.gbp,
      currencies.usd,
      currencies.eur,
      currencies.aud,
    ]);
  });
});
