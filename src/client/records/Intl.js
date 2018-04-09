// @flow
import { langInfoDefault } from "./LangInfo";
import type { LangInfo } from "./LangInfo";

export type Intl = {|
  language: LangInfo,
  translations: { [key: string]: string },
|};

export type Intls = { [key: string]: Intl };

// eslint-disable-next-line import/prefer-default-export
export const intlDefault: Intl = {
  language: langInfoDefault,
  translations: {},
};
