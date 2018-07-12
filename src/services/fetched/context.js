// @flow strict
import * as React from "react";

import { fetchedDefault } from "../../records/Fetched";

export const { Consumer, Provider } = React.createContext(fetchedDefault);
