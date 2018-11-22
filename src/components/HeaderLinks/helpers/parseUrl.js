// @flow

// Types
import type { Item, Param } from "../components/Links/index";
import type { ReadyUrl, HiddenUrls } from "../index";

// Types
export type ParseUrl = {|
  searchParams: {
    language: string,
  },
  item: Item,
  urlParam: string,
  readyUrls: ReadyUrl,
  hiddenUrls: HiddenUrls,
|};

export type ParseParameters = {|
  url: string,
  preparedLang: string,
|};

export type TrackingUrl = {|
  item: {
    provider: string,
    id: string,
  },
  url?: string,
  urlParam?: string,
  language?: string,
  query: ?string,
|};

export type GetSupportedLanguage = {|
  language: string,
  supportedLanguages: string[],
|};

export type ParseLanguage = {|
  language: string,
  isoShort?: boolean,
  isoCars?: boolean,
|};

/*
  Check if user language is supported,
  if not - return default ("gb")
*/
export const getSupportedLanguage = ({ language, supportedLanguages }: GetSupportedLanguage) =>
  supportedLanguages && supportedLanguages.includes(language) ? language : "gb";

/*
  Some companies require different ISO format for language
  - format correct ISO format for given company
*/
export const parseLanguage = ({ language, isoShort, isoCars }: ParseLanguage) => {
  const languageShort = language.substring(0, 2);

  // Handle cars link exception for greek language
  const isCarsGreekExpection = isoCars && languageShort === "el";

  // Check if cars greek expection (only exception atm)
  const isoShortWithExcpetion = isCarsGreekExpection ? "gr" : languageShort;

  // If isoShort requred return isoShort with exceptions handled
  // If isoShort is not required return original language format
  return isoShort ? isoShortWithExcpetion : language;
};

/*
  All requests must be tracked
  - Wrap actual url & json encoded (tracking) object
    inside tracking template link
*/
export const trackingUrl = ({ item, url, urlParam, language, query }: TrackingUrl) => {
  const trackingBase = "https://red-cougar.kiwi.com/nav-bar-link";
  const queryParamsReady = [
    url && `u=${url}`,
    query && `query=${btoa(query)}`,
    urlParam && `r=${urlParam}`,
    language && `lang=${language}`,
    item &&
      `payload=${btoa(
        JSON.stringify({
          category: "NavBar",
          subCategory: "Link",
          action: "Click",
          detail: `${item.provider} - ${item.id}`,
        }),
      )}`,
  ]
    .filter(Boolean)
    .join("&");

  return `${trackingBase}?${queryParamsReady}`;
};

/*
  Generate search query parameters
*/
export const generateSearchQuery = (params: Param[], searchParams: {}) => {
  const queryItems = params.map(param => {
    // Prepare query search param
    const value = param.prop ? searchParams[param.prop] : param.value || "";

    // Join key with value
    return `${param.key}=${value}`;
  });

  // Join items
  return queryItems.join("&");
};

// Parse url
export const parseUrl = ({ item, searchParams, urlParam, readyUrls, hiddenUrls }: ParseUrl) => {
  const { url, isoShort, isoCars, supportedLanguages, params } = item;
  const { language } = searchParams;

  // Hide if FE a/b tests is disabled
  if (hiddenUrls[item.id]) return null;

  // Check if there's ready url sent by FE
  if (item.feLink) {
    const readyUrl = readyUrls[item.id];

    // If object is not provided by FE return null (shouldn't be common)
    if (!readyUrl) return null;

    return trackingUrl({
      url: readyUrl.base,
      query: readyUrl.query,
      item: {
        provider: readyUrl.base,
        id: item.id,
      },
    });
  }

  // Filter supported languages
  const supportedLanguage = supportedLanguages
    ? getSupportedLanguage({ language, supportedLanguages })
    : language;

  // Try fetching link by user language
  const base = url && (url[language] || url.default);

  // Prepare search params (cars language has an exception regarding greek langauge)
  const preparedSearchParams = {
    ...searchParams,
    language: parseLanguage({ language: supportedLanguage, isoShort, isoCars }),
  };

  // Check if url requires query params pasing
  const query =
    params && params.length > 0 ? generateSearchQuery(params, preparedSearchParams) : null;

  // Wrap inside tracking url
  return trackingUrl({ item, url: base, urlParam, language: supportedLanguage, query });
};

export default {
  parseUrl,
  trackingUrl,
  parseLanguage,
};
