// @flow strict
import type { Languages } from "./Languages";

export type BrandLanguage = {|
  defaultLocale: string,
  languages: Languages,
  continents: string[],
|};

export type BrandLanguages = {
  [brandId: string]: {
    [localeId: string]: BrandLanguage,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const brandLanguageDefault: BrandLanguage = {
  defaultLocale: "en",
  languages: {
    en: {
      id: "en",
      name: "English",
      flag: "gb",
      defaultCountry: "uk",
      continent: "eu",
    },
  },
  continents: ["eu"],
};
