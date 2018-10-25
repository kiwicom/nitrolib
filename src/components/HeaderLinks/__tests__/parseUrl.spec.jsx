// @flow strict

// Methods
import {
  getSupportedLanguage,
  parseLanguage,
  trackingUrl,
  parseUrl,
  generateSearchQuery,
} from "../helpers/parseUrl";

// Default props
const PROPS = {
  urlParam: "search",
};

const SEARCH_PARAMS = {
  adultsCount: 1,
  aid: true,
  childrenCount: 3,
  currency: "eur",
  language: "hr",
};

const ITEM = {
  id: "rooms",
  image: "rooms-img",
  isoShort: false,
  isoCars: false,
  params: [
    { key: "lang", prop: "language" },
    { key: "selected_currency", prop: "currency" },
    { key: "group_adults", prop: "adultsCount" },
    { key: "group_children", prop: "childrenCount" },
    { key: "aid", prop: "aid" },
  ],
  provider: "booking.com",
  translation: "search.service.rooms",
  url: { default: "ROOMS" },
};

const QUERY_PARSED = "lang=hr&selected_currency=eur&group_adults=1&group_children=3&aid=true";

// Expected end result - url
const RESULT_URL = `https://red-cougar.kiwi.com/nav-bar-link?u=${
  ITEM.url.default
}&r=search&lang=hr&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoiYm9va2luZy5jb20gLSByb29tcyJ9&query=bGFuZz1ociZzZWxlY3RlZF9jdXJyZW5jeT1ldXImZ3JvdXBfYWR1bHRzPTEmZ3JvdXBfY2hpbGRyZW49MyZhaWQ9dHJ1ZQ==`;

const RESULT_URL_NO_QUERY = `https://red-cougar.kiwi.com/nav-bar-link?u=${
  ITEM.url.default
}&r=search&lang=hr&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoiYm9va2luZy5jb20gLSByb29tcyJ9`;

describe("parseUrl", () => {
  test("getSupportedLanguage should return supported language", () => {
    const parsedLanguage = getSupportedLanguage({
      language: "it",
      supportedLanguages: ["it", "en"],
    });
    expect(parsedLanguage).toBe("it");
  });

  test("getSupportedLanguage should handle unsupported language", () => {
    const parsedLanguage = getSupportedLanguage({
      language: "it",
      supportedLanguages: ["nn", "en"],
    });
    expect(parsedLanguage).toBe("gb");
  });

  test("parseLanguage should return correct language", () => {
    const parsedLanguage = parseLanguage({ language: "ita", isoShort: true, isoCars: false });
    expect(parsedLanguage).toBe("it");
  });

  test("generateSearchQuery should generate search query", () => {
    const parsedQuery = generateSearchQuery(ITEM.params, SEARCH_PARAMS);
    expect(parsedQuery).toBe(QUERY_PARSED);
  });

  test("trackingUrl should correctly fill params", () => {
    const parsedUrl = trackingUrl({
      item: ITEM,
      url: ITEM.url.default,
      urlParam: PROPS.urlParam,
      language: SEARCH_PARAMS.language,
      query: QUERY_PARSED,
    });
    expect(parsedUrl).toBe(RESULT_URL);
  });

  test("trackingUrl should correctly fill params - no query", () => {
    const parsedUrl = trackingUrl({
      item: ITEM,
      url: ITEM.url.default,
      urlParam: PROPS.urlParam,
      language: SEARCH_PARAMS.language,
      query: null,
    });
    expect(parsedUrl).toBe(RESULT_URL_NO_QUERY);
  });

  test("trackingUrl should return correct url", () => {
    const parsedUrl = parseUrl({
      item: ITEM,
      searchParams: SEARCH_PARAMS,
      urlParam: PROPS.urlParam,
    });
    expect(parsedUrl).toBe(RESULT_URL);
  });
});
