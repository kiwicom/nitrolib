// @flow strict
import { getLink, getCarsLanguage } from "../link";

const currency = {
  enabledOnAffilId: "",
  fallback: "",
  format: "__price__ €",
  id: "eur",
  name: "Euro",
  rate: 1,
  round: "2",
  uncertainFormat: false,
};

const currencySE = {
  enabledOnAffilId: "",
  fallback: "",
  format: "__price__ SEK",
  id: "sek",
  name: "SEK",
  rate: 10,
  round: "2",
  uncertainFormat: false,
};

const language = {
  addressPlaceholder: "71 Wall Stt",
  api: "en",
  canonical: "",
  cityPlaceholder: "New York",
  companyNamePlaceholder: "Kiwi.com",
  companyVatPlaceholder: "10007",
  countriesTranslations: "EN",
  currency: "gbp",
  dateFormat: "ddd D MMM",
  dateFormatLong: "DD.MM.YYYY",
  dateFormatPlain: "L",
  dateFormatShort: "D/M",
  decimalSeparator: ".",
  defaultCountry: "gb",
  dimension: "__x__ cm",
  direction: "ltr",
  displayName: "English",
  distanceUnit: "__x__ km",
  distanceUnitConversionRate: "1",
  durationFormat: "H[h] mm[m]",
  durationFormatShort: "m[m] ss[s]",
  elevioLang: "",
  email: "en",
  firstNamePlaceholder: "Harry James",
  flag: "gb",
  fontSubsets: "greek,latin-ext",
  hreflang: "en-GB",
  id: "en",
  idNumberPlaceholder: "1234567890",
  iso: "en-GB",
  jumio: "en_GB",
  lastNamePlaceholder: "Brown",
  latinInputs: false,
  locations: "en",
  moment: "en-gb",
  name: "English",
  nginx: "en",
  phone: "gb",
  phraseApp: "en-GB",
  separateFourDigits: "1",
  specialFont: "",
  thousandsSeparator: ",",
  timeFormat: "LT",
  translations: "en",
  weight: "__x__ kg",
  zipCodePlaceholder: "10005",
};

const splitster = {
  HEADER_LINKS_PACKAGE_PROVIDER: "holidays",
  HEADER_LINKS_PACKAGE_PROVIDER_LASTMINUTE: "show",
};

const splitsterLastminute = {
  HEADER_LINKS_PACKAGE_PROVIDER: "lastminute",
  HEADER_LINKS_PACKAGE_PROVIDER_LASTMINUTE: "show",
};

const splitsterNone = {
  HEADER_LINKS_PACKAGE_PROVIDER: "none",
  HEADER_LINKS_PACKAGE_PROVIDER_LASTMINUTE: "hide",
};

describe("#HeaderLinks/service/link", () => {
  test("getCarsLanguage", () => {
    expect(getCarsLanguage("pt")).toEqual("pt");

    expect(getCarsLanguage("el")).toEqual("gr");

    expect(getCarsLanguage("de")).toEqual("de");
  });

  test("getLink", () => {
    expect(getLink(currency, language, splitster)).toEqual("//holidays.kiwi.com/gb/?utm_id=24897");

    expect(getLink(currencySE, language, splitsterLastminute)).toEqual(
      "https://kiwicom.lastminute.com/flight-hotel/?utm_source=kiwicom_header_link",
    );

    expect(getLink(currencySE, language, splitsterNone)).toEqual(null);
  });
});
