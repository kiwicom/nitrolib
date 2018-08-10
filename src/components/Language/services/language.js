// @flow strict
import * as R from "ramda";

import type { Language } from "../../../records/Languages";
/*
const findMatchingLanguage = (req: Req, country: string) => {
  const languages = parseAcceptHeader(req.header("Accept-Language"));

  return (
    languages.reduce((res, language) => {
      if (res) {
        return res;
      }
      if (language.includes("-")) {
        if (isOurLanguage(language)) {
          return headerLangToOurs(language); // return language with locale f.e. en-gb
        } else if (isOurLanguage(language.split("-")[0])) {
          return headerLangToOurs(language.split("-")[0]); // return language with locale unwanted locale
        }
      } else if (isOurLanguage(`${language}-${country}`)) {
        return headerLangToOurs(`${language}-${country}`); // general language plus locale
      } else if (isOurLanguage(language)) {
        return headerLangToOurs(language); // return language without any locale exist
      }
      return null;
    }, null) || "en"
  );
};
const getCountryFromIp = ip => getGeoData(ip).then(x => x.isoCountryCode.toLowerCase());
*/
export default function getFavoriteLangauges(availableLanguages: Language[]) {
  const browserLanguage = null;

  const locationLanguage = null;
  const preferred = R.uniq([
    browserLanguage,
    locationLanguage,
    "us",
    "en",
    "cz",
    "es",
    "ru",
    "uk",
    "fr",
  ]).filter(Boolean);

  return R.flatten(
    preferred.map(langId => availableLanguages.filter(language => language.id === langId)),
  );
}
