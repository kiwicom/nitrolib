// @flow
import * as React from "react";

import { intlDefault } from "client/records/Intl";

// $FlowIssue
export const { Consumer, Provider } = React.createContext(intlDefault);
