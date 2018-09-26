// @flow strict
import * as React from "react";

import type { Auth } from "../../records/Auth";

type Context = {|
  auth: Auth | null,
  loading: boolean,
  error: string,
  onMyBooking: () => Promise<boolean>,
  onRegister: () => Promise<boolean>,
  onSignIn: (email: string, password: string) => Promise<boolean>,
|};

const contextDefault: Context = {
  auth: null,
  loading: false,
  error: "",
  onMyBooking: () => Promise.resolve(true),
  onRegister: () => Promise.resolve(true),
  onSignIn: () => Promise.resolve(true),
};

export const { Consumer, Provider } = React.createContext(contextDefault);
