// @flow strict

// Methods
import { parseLanguage, trackingUrl, parseUrl, parseParameters } from "../helpers/parseUrl";

// Test data
const SERVER_URL =
  "https://www.booking.com/index.html?lang={lang}&selected_currency={currency}&group_adults={adults}&group_children={children}&aid={aid}";

const PROPS = {
  link: SERVER_URL,
  currency: "eur",
  language: "cro",
  adultsCount: 1,
  childrenCount: 0,
  aid: false,
};

const PREPARED_PROPS = {
  link: SERVER_URL,
  preparedLang: "cro",
  preparedCurrency: "eur",
  preparedAdultsCount: "1",
  preparedChildrenCount: "0",
  preparedAid: "false",
};

const SERVER_URL_PARSED =
  "https://www.booking.com/index.html?lang=cro&selected_currency=eur&group_adults=1&group_children=0&aid=false";

const RESULT_URL = `https://red-tracking.com?url=${SERVER_URL_PARSED}&payload={"category":"Search","subCategory":"NavBar","action":"NavBar link clicked","destinations":{"logmole":true,"exponea":true,"ga":false}}`;

describe("parseUrl", () => {
  // Test parseLanguage with ISO format: lowercase // TODO: change to actual format
  test("parseLanguage should return correct case1 format", () => {
    const parsedLanguage = parseLanguage("Cro", "case1");

    expect(parsedLanguage).toBe("cro");
  });

  // Test parseLanguage with ISO format: uppercase // TODO: change to actual format
  test("parseLanguage should return correct case2 format", () => {
    const parsedLanguage = parseLanguage("Cro", "case2");

    expect(parsedLanguage).toBe("CRO");
  });

  // Generate tracking url // TODO: Change to actual url
  test("trackingUrl should wrap original inside tracking url", () => {
    const parsedUrl = trackingUrl(SERVER_URL_PARSED);

    expect(parsedUrl).toBe(RESULT_URL);
  });

  // Replace all url variables with values
  test("parseParameters should return url with replaced variables", () => {
    const parsedUrl = parseParameters({ ...PREPARED_PROPS });

    expect(parsedUrl).toBe(SERVER_URL_PARSED);
  });

  // Replace link variables (main function)
  test("trackingUrl should return correct url", () => {
    const parsedUrl = parseUrl({ ...PROPS });

    expect(parsedUrl).toBe(RESULT_URL);
  });
});
