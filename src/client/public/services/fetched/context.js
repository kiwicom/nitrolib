// @flow strict
import * as React from "react";

import { fetchedDefault } from "client/public/records/Fetched";

export const { Consumer, Provider } = React.createContext(fetchedDefault);
