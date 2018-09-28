// @flow strict
import getLink from "../carsLink";

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

describe("#HeaderLinks/service/holidaysLink", () => {
  test("getLink", () => {
    expect(getLink(language)).toEqual("https://cars.kiwi.com/?preflang=en&adplat=headerlinks");
  });
});
