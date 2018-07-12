// @flow strict
import * as React from "react";

import { intlDefault } from "../../records/Intl";

export const { Consumer, Provider } = React.createContext(intlDefault);
