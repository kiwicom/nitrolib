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

/*
  Some companies require different ISO format for language
  - format correct ISO format for given company
*/
const parseLanguage = (language: string) => {
  // TODO: Change this
  const isoFormat = "case1";

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
const trackingUrl = (url: string) => {
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

// Parse url
export const parseUrl = ({
  link,
  language,
  currency,
  adultsCount,
  childrenCount,
  aid,
}: ParseUrl) => {
  // Prepare values
  const preparedLang = parseLanguage(language);
  const preparedAdultsCount = JSON.stringify(adultsCount);
  const preparedChildrenCount = JSON.stringify(childrenCount);
  const preparedAid = JSON.stringify(aid);

  // Replace variables with values
  const url = link
    .replace(/{lang}/g, preparedLang)
    .replace(/{currency}/g, currency)
    .replace(/{adults}/g, preparedAdultsCount)
    .replace(/{children}/g, preparedChildrenCount)
    .replace(/{aid}/g, preparedAid);

  // Generate tracking URL
  return trackingUrl(url);
};

export default {
  parseUrl,
};
