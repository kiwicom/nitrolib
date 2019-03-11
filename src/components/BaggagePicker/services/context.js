// @flow
import * as React from "react";

import type { Airline } from "../../../records/Airline";

type Context = {
  airlines?: { [string]: Airline },
  shouldShowRecheckNote?: boolean,
  prioBoardingLinkHandler?: (Array<Airline>) => void,
};

const context: React.Context<Context> = React.createContext({});

export const { Consumer, Provider } = context;
