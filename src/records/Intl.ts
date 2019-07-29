import enUS from "date-fns/locale/en-US"; // fallback

import { langInfoDefault } from "./LangInfo";
import { LangInfo } from "./LangInfo";
import { Translations, Translate } from "../services/intl/translate";

export type IntlRaw = {
  language: LangInfo,
  translations: Translations,
};

export type Intl = {
  ...IntlRaw,
    translate: Translate,
    getLocale: Promise<$FlowFixMe>,
};

export type IntlsRaw = { [key: string]: IntlRaw };
export type Intls = { [key: string]: Intl };

// eslint-disable-next-line import/prefer-default-export
export const intlDefault: Intl = {
  language: langInfoDefault,
  translations: {},
  translate: id => id,
  getLocale: Promise.resolve(enUS),
};
