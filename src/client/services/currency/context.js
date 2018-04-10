// @flow
import * as React from "react";

import { currencyDefault } from "client/records/Currency";

// $FlowIssue
export const { Consumer, Provider } = React.createContext(currencyDefault);
