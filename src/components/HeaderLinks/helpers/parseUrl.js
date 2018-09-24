// @flow strict

// Types
export type ParseUrl = {|
  link: string,
  language: string,
  currency: string,
  adultsCount: number,
  childrenCount: number,
  aid: boolean,
|};

export type ParseParameters = {|
  link: string,
  preparedLang: string,
  preparedCurrency: string,
  preparedAdultsCount: string,
  preparedChildrenCount: string,
  preparedAid: string,
|};

/*
  Some companies require different ISO format for language
  - format correct ISO format for given company
*/
export const parseLanguage = (language: string, isoFormat: string) => {
  // Get correct language ISO format
  switch (isoFormat) {
    case "case1":
      return language.toLowerCase();
    case "case2":
      return language.toUpperCase();
    default:
      return language;
  }
};

/*
  All requests must be tracked
  - Wrap actual url & json encoded (tracking) object
    inside tracking template link
*/
export const trackingUrl = (url: string) => {
  // Tracking URL template
  const template = "https://red-tracking.com?url={url}&payload={json}";

  // Tracking parameters - encoded
  const jsonEncoded = JSON.stringify({
    category: "Search",
    subCategory: "NavBar",
    action: "NavBar link clicked",
    destinations: { logmole: true, exponea: true, ga: false },
  });

  // Generate tracking url - insert actual URL & JSON
  return template.replace(/{url}/, url).replace(/{json}/, jsonEncoded);
};

// Repace insert url parameters {lang} to "cro"
export const parseParameters = ({
  link,
  preparedLang,
  preparedCurrency,
  preparedAdultsCount,
  preparedChildrenCount,
  preparedAid,
}: ParseParameters) =>
  link
    .replace(/{lang}/g, preparedLang)
    .replace(/{currency}/g, preparedCurrency)
    .replace(/{adults}/g, preparedAdultsCount)
    .replace(/{children}/g, preparedChildrenCount)
    .replace(/{aid}/g, preparedAid);

// Parse url
export const parseUrl = ({
  link,
  language,
  currency,
  adultsCount,
  childrenCount,
  aid,
}: ParseUrl) => {
  // Replace variables with values
  const url = parseParameters({
    link,
    preparedLang: parseLanguage(language, "case1"),
    preparedCurrency: currency.toLowerCase(),
    preparedAdultsCount: JSON.stringify(adultsCount),
    preparedChildrenCount: JSON.stringify(childrenCount),
    preparedAid: JSON.stringify(aid),
  });

  // Generate tracking URL
  return trackingUrl(url);
};

export default {
  parseUrl,
};
