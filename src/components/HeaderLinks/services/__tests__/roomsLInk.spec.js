// @flow strict
import getLink from "../roomsLink";

const searchFormData = {
  mode: "return",
  destination: { type: "city", name: "Bratislava" },
  checkIn: new Date(1533815323),
  checkOut: new Date(1534381200),
  adults: 2,
  children: 1,
};

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

describe("#HeaderLinks/service/roomsLink", () => {
  test("getLink", () => {
    expect(getLink("booking", language, currency, searchFormData)).toEqual(
      "https://www.booking.com/searchresults.html?lang=en&selected_currency=EUR&ss=Bratislava&checkin_monthday=18&checkin_year_month=1970-01&checkout_monthday=18&checkout_year_month=1970-01&group_adults=2&group_children=1&aid=1549681",
    );

    expect(getLink("roomsKiwi", language, currencySE, searchFormData)).toEqual(
      "https://rooms.kiwi.com/searchresults.html?lang=en&selected_currency=SEK&ss=Bratislava&checkin_monthday=18&checkin_year_month=1970-01&checkout_monthday=18&checkout_year_month=1970-01&group_adults=2&group_children=1&label=headerlinks",
    );

    expect(getLink("roomsKiwiCode", language, currencySE, searchFormData)).toEqual(
      "https://rooms.kiwi.com/searchresults.html?lang=en&selected_currency=SEK&ss=Bratislava&checkin_monthday=18&checkin_year_month=1970-01&checkout_monthday=18&checkout_year_month=1970-01&group_adults=2&group_children=1&aid=1549200&label=headerlinks",
    );
  });
});
