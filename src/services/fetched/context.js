// @flow strict
import * as React from "react";

import { fetchedDefault } from "../../records/Fetched";
import type { Fetched } from "../../records/Fetched";

const context: React.Context<Fetched> = React.createContext(fetchedDefault);

export const { Consumer, Provider } = context;
