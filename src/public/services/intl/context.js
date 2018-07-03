// @flow strict
import * as React from "react";

import { intlDefault } from "public/records/Intl";

export const { Consumer, Provider } = React.createContext(intlDefault);
