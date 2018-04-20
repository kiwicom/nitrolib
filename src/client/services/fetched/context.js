// @flow strict
import * as React from "react";

import { countryDefault } from "client/records/Country";
import { continentsDefault } from "client/records/Continents";
import { languagesDataDefault } from "client/records/Languages";

export const { Consumer, Provider } = React.createContext({
  countries: { en: countryDefault },
  continents: continentsDefault,
  languagesData: languagesDataDefault,
});
