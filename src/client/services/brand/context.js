// @flow
import * as React from "react";

import { brandDefault } from "client/records/Brand";

export const { Consumer, Provider } = React.createContext(brandDefault);
