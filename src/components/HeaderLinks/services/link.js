// @flow strict
import type { Currency } from "../../../records/Currency";
import type { LangInfo } from "../../../records/LangInfo";
import type { Splitster } from "../../../records/Splitster";

// holidays.kiwi.com are powered by Logitravel
const getLogitravelDeeplink = (isoShort: string) => {
  const supportedLanguages = [
    "pt",
    "es",
    "it",
    // "gb", -> gb is a fallback, and also the only non-ISO code in this list of supported langs
  ];
  const logitravelDeeplinkLang = supportedLanguages.indexOf(isoShort) > -1 ? isoShort : "gb";
  return `//holidays.kiwi.com/${logitravelDeeplinkLang}/?utm_id=24897`;
};

// formatting of the
const getLastminuteDeeplink = (lang: string) => {
  const utmSource = "?utm_source=kiwicom_header_link";

  switch (lang) {
    case "ie":
      return `https://kiwicom-ie.lastminute.com/flight-hotel/${utmSource}`;
    case "es":
      return `https://kiwicom-es.lastminute.com/vuelo-hotel/${utmSource}`;
    case "fr":
      return `https://kiwicom-fr.lastminute.com/vol-hotel/${utmSource}`;
    case "it":
      return `https://kiwicom-it.lastminute.com/volo-hotel/${utmSource}`;
    case "de":
      return `https://kiwicom.lastminute.de/flug-hotel/${utmSource}`;
    case "en":
    default:
      return `https://kiwicom.lastminute.com/flight-hotel/${utmSource}`;
  }
};

// cars.kiwi.com are powered by rentalcars.com
export const getCarsLanguage = (isoShort: string) => (isoShort === "el" ? "gr" : isoShort); // "fix" greek language code

// Supported currenceis on Logitravel
const HOLIDAYS_CURRENCIES = ["eur", "gbp"];
const PACKAGES = {
  holidays: {
    getLink: (lang: string) => getLogitravelDeeplink(lang),
  },
  lastminute: {
    getLink: (lang: string) => getLastminuteDeeplink(lang),
  },
};

export function getLink(currency: Currency, language: LangInfo, splitster: Splitster) {
  const packageProvider = splitster.HEADER_LINKS_PACKAGE_PROVIDER;
  const packageProvideLastminuteSupported =
    splitster.HEADER_LINKS_PACKAGE_PROVIDER_LASTMINUTE === "show";

  const packageProviderSet = packageProvider && packageProvider !== "none";

  // Intersection of Logitravel & Lastminute
  // Let AB test decide (packageProvider)
  const showPackagesIntersection = packageProviderSet && HOLIDAYS_CURRENCIES.includes(currency.id);
  const packages = showPackagesIntersection && PACKAGES[packageProvider];

  // Lastminute extra
  const packagesLastMinute =
    !showPackagesIntersection && packageProvideLastminuteSupported && PACKAGES.lastminute;

  if (packages) {
    const lang = packageProvider === "holidays" ? language.iso.substring(0, 2) : language.id;
    return PACKAGES[packageProvider].getLink(lang);
  }
  if (packagesLastMinute) {
    return PACKAGES.lastminute.getLink(language.id);
  }
  return null;
}
