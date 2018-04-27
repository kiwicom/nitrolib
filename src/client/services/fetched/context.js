// @flow
import * as React from "react";

import { countryDefault } from "client/records/Country";
import { continentsDefault } from "client/records/Continents";

// $FlowIssue
export const { Consumer, Provider } = React.createContext({
  countries: { en: countryDefault },
  continents: continentsDefault,
});
