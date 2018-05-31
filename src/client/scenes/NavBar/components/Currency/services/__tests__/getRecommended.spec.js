// @flow strict
import { langInfoDefault } from "client/records/LangInfo";
import { countryDefault } from "client/records/Country";
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

describe("#Currency/getRecommended", () => {
  test("no country, no language", () => {
    expect(getRecommended(null, { ...langInfoDefault, currency: "" }, currencies)).toEqual({
      usd: currencies.usd,
      eur: currencies.eur,
      gbp: currencies.gbp,
      aud: currencies.aud,
    });
  });

  test("with country and currency", () => {
    expect(
      getRecommended(
        { ...countryDefault, currency: "huf" },
        { ...langInfoDefault, currency: "gbp" },
        currencies,
      ),
    ).toEqual({
      huf: currencies.huf,
      gbp: currencies.gbp,
      usd: currencies.usd,
      eur: currencies.eur,
    });
  });

  test("with identical country and currency", () => {
    expect(
      getRecommended(
        { ...countryDefault, currency: "gbp" },
        { ...langInfoDefault, currency: "gbp" },
        currencies,
      ),
    ).toEqual({
      gbp: currencies.gbp,
      usd: currencies.usd,
      eur: currencies.eur,
      aud: currencies.aud,
    });
  });
});
