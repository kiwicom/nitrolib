import * as React from "react";

import { fetchedDefault } from "../../records/Fetched";
import { Fetched } from "../../records/Fetched";

const context: React.Context<Fetched> = React.createContext(fetchedDefault);

export const { Consumer, Provider } = context;

export default context;
