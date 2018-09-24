// @flow strict

// Methods
import { parseLanguage, trackingUrl, parseUrl, parseParameters } from "../helpers/parseUrl";

// Original url - fetched from server
const ORIGINAL_URL =
  "https://www.booking.com/index.html?lang={lang}&selected_currency={currency}&group_adults={adults}&group_children={children}&aid={aid}";

// Original url - fetched from server - parsed
const ORIGINAL_URL_PARSED =
  "https://www.booking.com/index.html?lang=cro&selected_currency=eur&group_adults=1&group_children=0&aid=false";

// Expected end result - url
const RESULT_URL = `https://red-tracking.com?url=${ORIGINAL_URL_PARSED}&payload={"category":"Search","subCategory":"NavBar","action":"NavBar link clicked","destinations":{"logmole":true,"exponea":true,"ga":false}}`;

// Default props
const PROPS = {
  link: ORIGINAL_URL,
  currency: "eur",
  language: "cro",
  adultsCount: 1,
  childrenCount: 0,
  aid: false,
};

// Default props - stringified (for trackingUrl method)
const PREPARED_PROPS = {
  link: ORIGINAL_URL,
  preparedLang: "cro",
  preparedCurrency: "eur",
  preparedAdultsCount: "1",
  preparedChildrenCount: "0",
  preparedAid: "false",
};

describe("parseUrl", () => {
  test("parseLanguage should return correct case1 format", () => {
    const parsedLanguage = parseLanguage("Cro", "case1");
    expect(parsedLanguage).toBe("cro");
  });

  test("parseLanguage should return correct case2 format", () => {
    const parsedLanguage = parseLanguage("Cro", "case2");
    expect(parsedLanguage).toBe("CRO");
  });

  test("trackingUrl should wrap original inside tracking url", () => {
    const parsedUrl = trackingUrl(ORIGINAL_URL_PARSED);
    expect(parsedUrl).toBe(RESULT_URL);
  });

  test("parseParameters should return url with replaced variables", () => {
    const parsedUrl = parseParameters({ ...PREPARED_PROPS });
    expect(parsedUrl).toBe(ORIGINAL_URL_PARSED);
  });

  test("trackingUrl should return correct url", () => {
    const parsedUrl = parseUrl({ ...PROPS });
    expect(parsedUrl).toBe(RESULT_URL);
  });
});
