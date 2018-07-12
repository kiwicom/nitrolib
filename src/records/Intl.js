// @flow strict
import { langInfoDefault } from "./LangInfo";
import type { LangInfo } from "./LangInfo";
import type { Translate } from "../../services/intl/translate";

export type Intl = {|
  language: LangInfo,
  translations: {},
  translate: Translate,
|};

export type Intls = { [key: string]: Intl };

// eslint-disable-next-line import/prefer-default-export
export const intlDefault: Intl = {
  language: langInfoDefault,
  translations: {},
  translate: id => id,
};
