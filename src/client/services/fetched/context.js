// @flow strict
import * as React from "react";

import { fetchedDefault } from "client/records/Fetched";

export const { Consumer, Provider } = React.createContext(fetchedDefault);
