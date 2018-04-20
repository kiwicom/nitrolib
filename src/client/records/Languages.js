// @flow strict
export type Language = {|
  id: string,
  name: string,
  flag: string,
  defaultCountry: string,
  continent: string | string[],
|};

export type Languages = { [key: string]: Language };

export type LanguagesData = {|
  default: string,
  languages: Languages,
  continents: { id: string, translatedName: string }[],
|};

type BrandLanguagesData = {|
  default: string,
  languages: Languages,
  continents: string[],
|};

export type BrandLanguagesDataMap = { [key: string]: BrandLanguagesData };

// eslint-disable-next-line import/prefer-default-export
export const languagesDataDefault: LanguagesData = {
  default: "en",
  languages: {
    en: {
      id: "en",
      name: "English",
      flag: "uk",
      defaultCountry: "uk",
      continent: "eu",
    },
  },
  continents: [{ id: "eu", translatedName: "Europa" }],
};
