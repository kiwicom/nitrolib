// @flow strict
// import some from "lodash/some";

// Types
import type { Item } from "../Links";

// Types
export type ParseUrl = {|
  searchParams: {
    language: string,
    currency: string,
    adultsCount: number,
    childrenCount: number,
    aid: boolean,
  },
  item: Item,
  urlParam: string,
|};

export type ParseParameters = {|
  url: string,
  preparedLang: string,
|};

export type TrackingUrl = {|
  item: Item,
  url: string,
  urlParam: string,
  language: string,
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
  const queryParam = query ? "&query={query}" : "";
  // Tracking URL template (TODO: update when proxy is ready)
  const template = `https://red-cougar.kiwi.com/nav-bar-link?u={url}&r={urlParam}&lang={lang}&payload={json}${queryParam}`;

  // Tracking parameters - encoded
  const json = btoa(
    JSON.stringify({
      category: "NavBar",
      subCategory: "Link",
      action: "Click",
      detail: `${item.provider} - ${item.id}`,
    }),
  );

  // Encode query
  // const urlEncoded = btoa(url);
  const queryEncoded = query ? btoa(query) : "";

  // Generate tracking url - insert actual URL & JSON
  return template
    .replace(/{url}/, url)
    .replace(/{urlParam}/, urlParam)
    .replace(/{lang}/, language)
    .replace(/{query}/, queryEncoded)
    .replace(/{json}/, json);
};

/*
  Generate search query parameters
*/
export const generateSearchQuery = (params: Object[], searchParams: Object) => {
  const queryItems = params.map(param => {
    // Prepare query search param
    const value = param.prop ? searchParams[param.prop] : param.value;

    // Join key with value
    return `${param.key}=${value}`;
  });

  // Join items
  return queryItems.join("&");
};

// Parse url
export const parseUrl = ({ item, searchParams, urlParam }: ParseUrl) => {
  const { url, isoShort, isoCars, supportedLanguages, params } = item;
  const { language } = searchParams;

  // Filter supported languages
  const supportedLanguage = supportedLanguages
    ? getSupportedLanguage({ language, supportedLanguages })
    : language;

  // Try fetching link by user language
  const base = url[language] || url.default;

  // Prepare search params (cars language has an exception regarding greek langauge)
  const preparedSearchParams = {
    ...searchParams,
    language: parseLanguage({ language: supportedLanguage, isoShort, isoCars }),
  };

  // Check if url requires query params pasing
  const hasSearchParams = item.params && item.params.length > 0;
  const query = hasSearchParams ? generateSearchQuery(params, preparedSearchParams) : null;

  // Wrap inside tracking url
  return trackingUrl({ item, url: base, urlParam, language: supportedLanguage, query });
};

export default {
  parseUrl,
  trackingUrl,
  parseLanguage,
};
