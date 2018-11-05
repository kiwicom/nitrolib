// @flow strict
import * as React from "react";

import { intlDefault } from "../../records/Intl";
import type { Intl } from "../../records/Intl";

const context: React.Context<Intl> = React.createContext(intlDefault);

export const { Consumer, Provider } = context;
