// @flow strict
import * as React from "react";
import type { Environment } from "react-relay";

import type { Auth, SocialProvider } from "../../records/Auth";
import environment from "../environment";
import type { MyBookingInput, RegisterInput } from "./api";

export type Context = {|
  auth: Auth | null,
  loading: boolean,
  error: string,
  environment: Environment,
  onMyBooking: (input: MyBookingInput) => Promise<string | null>,
  onRegister: (input: RegisterInput) => Promise<boolean>,
  onSocialAuth: (provider: SocialProvider) => Promise<boolean>,
  onSignIn: (email: string, password: string) => Promise<boolean>,
  onSignOut: () => void,
|};

const contextDefault: Context = {
  auth: null,
  loading: false,
  error: "",
  environment,
  onMyBooking: () => Promise.resolve(null),
  onRegister: () => Promise.resolve(true),
  onSocialAuth: () => Promise.resolve(true),
  onSignIn: () => Promise.resolve(true),
  onSignOut: () => {},
};

export const { Consumer, Provider } = React.createContext(contextDefault);
