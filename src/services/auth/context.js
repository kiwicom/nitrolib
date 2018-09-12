// @flow strict
import * as React from "react";

import type { Auth } from "../../records/Auth";

export type Context = {|
  auth: Auth | null,
  loading: boolean,
  onMyBooking: (token: string) => void,
  onRegister: () => void,
  onSignIn: (auth: ?Auth) => void,
|};

const contextDefault: Context = {
  auth: null,
  loading: false,
  onMyBooking: () => {},
  onRegister: () => {},
  onSignIn: () => {},
};

export const { Consumer, Provider } = React.createContext(contextDefault);
