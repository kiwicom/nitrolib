// @flow strict
import getLink from "../roomsLink";
import { langInfoDefault } from "../../../../records/LangInfo";
import currencies from "../../../../records/__mocks__/Currencies";

const language = langInfoDefault;

const searchFormData = {
  mode: "return",
  destination: { type: "city", name: "Bratislava" },
  checkIn: new Date(1533815323),
  checkOut: new Date(1534381200),
  adults: 2,
  children: 1,
};

describe("#HeaderLinks/service/roomsLink", () => {
  test("getLink booking", () => {
    expect(getLink("booking", language, currencies.eur, searchFormData)).toEqual({
      base: "BOOKING",
      query:
        "searchresults.html?lang=en&selected_currency=EUR&ss=Bratislava&checkin_monthday=18&checkin_year_month=1970-01&checkout_monthday=18&checkout_year_month=1970-01&group_adults=2&group_children=1&aid=1549681&label=headerlinks_cobrand",
    });
  });

  test("getLink roomsKiwi", () => {
    expect(getLink("roomsKiwi", language, currencies.sek, searchFormData)).toEqual({
      base: "ROOMS_KIWI",
      query:
        "searchresults.html?lang=en&selected_currency=SEK&ss=Bratislava&checkin_monthday=18&checkin_year_month=1970-01&checkout_monthday=18&checkout_year_month=1970-01&group_adults=2&group_children=1&label=headerlinks_logo",
    });
  });

  test("getLink roomsKiwiCode", () => {
    expect(getLink("roomsKiwiCode", language, currencies.sek, searchFormData)).toEqual({
      base: "ROOMS_KIWI_CODE",
      query:
        "searchresults.html?lang=en&selected_currency=SEK&ss=Bratislava&checkin_monthday=18&checkin_year_month=1970-01&checkout_monthday=18&checkout_year_month=1970-01&group_adults=2&group_children=1&aid=1549200&label=headerlinks",
    });
  });
});
