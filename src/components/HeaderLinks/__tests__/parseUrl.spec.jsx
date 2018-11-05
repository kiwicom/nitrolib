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
  hiddenUrls: {
    holidays: false,
    logitravel: true,
  },
  readyUrls: {
    rooms: {
      base: "BOOKING",
      query: "?param1=123&param2=345",
    },
  },
};

const SEARCH_PARAMS = {
  language: "hr",
};

const ITEM = {
  id: "cars",
  image: "cars-img",
  isoShort: false,
  isoCars: false,
  newWindow: true,
  params: [{ key: "preflang", prop: "language" }, { key: "adplat", value: "headerlinks" }],
  provider: "kiwi.com",
  translation: "search.service.cars",
  url: { default: "CARS" },
};

const QUERY_PARSED = "preflang=hr&adplat=headerlinks";

// Expected end result - url
const RESULT_URL = `https://red-cougar.kiwi.com/nav-bar-link?u=CARS&query=cHJlZmxhbmc9aHImYWRwbGF0PWhlYWRlcmxpbmtz&r=search&lang=hr&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoia2l3aS5jb20gLSBjYXJzIn0=`;

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

  test("trackingUrl should return correct url", () => {
    const parsedUrl = parseUrl({
      item: ITEM,
      searchParams: SEARCH_PARAMS,
      urlParam: PROPS.urlParam,
      readyUrls: PROPS.readyUrls,
      hiddenUrls: PROPS.hiddenUrls,
    });
    expect(parsedUrl).toBe(RESULT_URL);
  });
});
