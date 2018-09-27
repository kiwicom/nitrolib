// @flow strict
import * as React from "react";
import type { Environment } from "react-relay";

import type { Auth } from "../../records/Auth";
import environment from "../environment";

type Context = {|
  auth: Auth | null,
  loading: boolean,
  error: string,
  environment: Environment,
  onMyBooking: () => Promise<boolean>,
  onRegister: () => Promise<boolean>,
  onSignIn: (email: string, password: string) => Promise<boolean>,
  onSignOut: () => void,
|};

const contextDefault: Context = {
  auth: null,
  loading: false,
  error: "",
  environment,
  onMyBooking: () => Promise.resolve(true),
  onRegister: () => Promise.resolve(true),
  onSignIn: () => Promise.resolve(true),
  onSignOut: () => {},
};

export const { Consumer, Provider } = React.createContext(contextDefault);
