// @flow strict
import * as React from "react";

import { countryDefault } from "client/records/Country";
import { continentsDefault } from "client/records/Continents";
import { brandLanguageDefault } from "client/records/BrandLanguage";

export const { Consumer, Provider } = React.createContext({
  countries: { en: countryDefault },
  continents: continentsDefault,
  brandLanguage: brandLanguageDefault,
});
