// @flow strict
const currencies = {
  czk: {
    id: "czk",
    name: "Koruna",
    code: "CZK",
    format: {
      format: "__price__ Kč",
      precision: 2,
    },
    fallback: null,
    enabledOnAffilId: "",
    rate: "0.3",
  },
  dkk: {
    id: "dkk",
    name: "Danish Krone",
    code: "DKK",
    format: {
      format: "__price__ kr",
      precision: 2,
    },
    fallback: null,
    enabledOnAffilId: "",
    rate: "0.13434",
  },
  gbp: {
    id: "gbp",
    name: "British Pound Sterling",
    code: "GBP",
    format: {
      format: "£__price__",
      precision: 2,
    },
    fallback: null,
    enabledOnAffilId: ["uk"],
    rate: "1.14355",
  },
  eur: {
    id: "eur",
    name: "Euro",
    code: "EUR",
    format: {
      format: "__price__ €",
      precision: 2,
    },
    fallback: null,
    enabledOnAffilId: "",
    rate: "1",
  },
  hkd: {
    id: "hkd",
    code: "HKD",
    name: "Hong Kong dollar",
    format: {
      format: "HK$__price__",
      precision: 2,
    },
    fallback: {
      id: "gbp",
      name: "British Pound Sterling",
      code: "GBP",
      format: {
        format: "£__price__",
        precision: 2,
      },
      fallback: null,
      enabledOnAffilId: ["uk"],
      rate: "1.14355",
    },
    enabledOnAffilId: "",
    rate: "0.109077",
  },
  sek: {
    id: "sek",
    name: "SEK",
    code: "SEK",
    format: {
      format: "__price__ SEK",
      precision: 2,
    },
    fallback: null,
    enabledOnAffilId: "",
    rate: "10",
  },
  usd: {
    id: "usd",
    name: "US Dollar",
    code: "USD",
    format: {
      format: "$ __price__",
      precision: 2,
    },
    fallback: null,
    enabledOnAffilId: "",
    rate: "0.855903",
  },
  aud: {
    id: "aud",
    name: "AU Dollar",
    code: "AUD",
    format: {
      format: "AU$ __price__",
      precision: 2,
    },
    fallback: null,
    enabledOnAffilId: "",
    rate: "3",
  },
};

export default currencies;
