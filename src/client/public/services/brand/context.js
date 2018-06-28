// @flow strict
import * as React from "react";

import { brandDefault } from "client/public/records/Brand";

export const { Consumer, Provider } = React.createContext(brandDefault);
