// @flow strict
import * as R from "ramda";

export type Language = {|
  id: string,
  name: string,
  flag: string,
  defaultCountry: string,
  continent: string | string[],
|};

export type Languages = { [key: string]: Language };

// eslint-disable-next-line import/prefer-default-export
export const getByContinent = (languages: Language[], continent: string): Language[] =>
  languages.filter(
    language =>
      R.is(String, language.continent)
        ? continent === language.continent
        : language.continent.includes(continent),
  );
