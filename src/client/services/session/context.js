// @flow strict
import * as React from "react";

import { sessionDefault } from "client/records/Session";

export const { Consumer, Provider } = React.createContext(sessionDefault);
