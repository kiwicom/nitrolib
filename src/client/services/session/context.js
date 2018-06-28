// @flow strict
import * as React from "react";

import { sessionDefault } from "client/public/components/records/Session";

export const { Consumer, Provider } = React.createContext(sessionDefault);
