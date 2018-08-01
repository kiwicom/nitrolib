// @flow strict
import { langInfoDefault } from "./LangInfo";
import type { LangInfo } from "./LangInfo";
import type { Translations, Translate } from "../services/intl/translate";

export type IntlRaw = {|
  language: LangInfo,
  translations: Translations,
|};

export type Intl = {|
  ...IntlRaw,
  translate: Translate,
|};

export type IntlsRaw = { [key: string]: IntlRaw };
export type Intls = { [key: string]: Intl };

// eslint-disable-next-line import/prefer-default-export
export const intlDefault: Intl = {
  language: langInfoDefault,
  translations: {},
  translate: id => id,
};
