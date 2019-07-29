import * as React from "react";

import { sessionDefault } from "../../records/Session";
import { Session } from "../../records/Session";

const context: React.Context<Session> = React.createContext(sessionDefault);

export const { Consumer, Provider } = context;

export default context;
