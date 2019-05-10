// @flow strict
import * as R from "ramda";

export type LangInfo = {|
  id: string,
  name: string,
  displayName: string,
  phone: string,
  email: string,
  defaultCountry: string,
  api: string,
  moment: string,
  jumio: string,
  nginx: string,
  countriesTranslations: string,
  phraseApp: string,
  translations: string,
  canonical: string,
  hreflang: string,
  iso: string,
  locations: string,
  dateFormat: string,
  dateFormatShort: string,
  dateFormatLong: string,
  dateFormatPlain: string,
  timeFormat: string,
  durationFormat: string,
  durationFormatShort: string,
  dimension: string,
  weight: string,
  latinInputs: boolean,
  currency: string,
  direction: string,
  flag: string,
  fontSubsets: string,
  firstNamePlaceholder: string,
  lastNamePlaceholder: string,
  addressPlaceholder: string,
  cityPlaceholder: string,
  zipCodePlaceholder: string,
  idNumberPlaceholder: string,
  companyVatPlaceholder: string,
  companyNamePlaceholder: string,
  distanceUnit: string,
  distanceUnitConversionRate: string,
  elevioLang: string,
  specialFont: string,
  decimalSeparator: string,
  thousandsSeparator: string,
  separateFourDigits: string,
|};

export type LangInfos = { [id: string]: LangInfo };

// eslint-disable-next-line import/prefer-default-export
export const langInfoDefault: LangInfo = {
  id: "en",
  name: "English",
  displayName: "English",
  phone: "gb",
  email: "en",
  defaultCountry: "gb",
  api: "en",
  moment: "en-gb",
  jumio: "en_GB",
  nginx: "en",
  countriesTranslations: "EN",
  translations: "en",
  phraseApp: "en-GB",
  canonical: "",
  hreflang: "en-GB",
  iso: "en-GB",
  locations: "en",
  dateFormat: "ddd D MMM",
  dateFormatShort: "D/M",
  dateFormatLong: "DD.MM.YYYY",
  dateFormatPlain: "L",
  timeFormat: "LT",
  durationFormat: "H[h] mm[m]",
  durationFormatShort: "m[m] ss[s]",
  dimension: "__x__ cm",
  weight: "__x__ kg",
  latinInputs: false,
  currency: "gbp",
  direction: "ltr",
  flag: "gb",
  fontSubsets: "greek,latin-ext",
  firstNamePlaceholder: "Harry James",
  lastNamePlaceholder: "Brown",
  addressPlaceholder: "71 Wall Stt",
  cityPlaceholder: "New York",
  zipCodePlaceholder: "10005",
  idNumberPlaceholder: "1234567890",
  companyVatPlaceholder: "10007",
  companyNamePlaceholder: "Kiwi.com",
  distanceUnit: "__x__ km",
  distanceUnitConversionRate: "1",
  elevioLang: "",
  specialFont: "",
  decimalSeparator: ".",
  thousandsSeparator: ",",
  separateFourDigits: "1",
};

export const fixDateFormat: (format: string) => string = R.compose(
  R.replace(/\bYYYY\b/g, "yyyy"),
  R.replace(/\bMMMD\b/g, "MMMd"), // Japan special
  R.replace(/\bD\b/g, "d"),
  R.replace(/\bDD\b/g, "dd"),
  R.replace(/\bddd\b/g, "eee"),
  R.replace(/\bdd\b/g, "eeeeee"),
);

export const fixTimeFormat: (format: string) => string = R.replace(/\bLT\b/g, "HH:mm");
// TODO: rewrite
export const fixDurationFormat: (format: string) => string = R.replace(/.*/, "HH:mm");
