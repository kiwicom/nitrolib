// @flow strict
import * as React from "react";
import type { Environment } from "react-relay";

import type { Auth, SocialProvider } from "../../records/Auth";
import environment from "../environment";
import type { MyBookingInput, RegisterInput } from "./api";

export type Context = {|
  auth: Auth | null,
  loading: boolean,
  environment: Environment,
  onResetError: () => void,
  onMyBooking: (input: MyBookingInput) => Promise<void>,
  onRegister: (input: RegisterInput) => Promise<void>,
  onSocialAuth: (provider: SocialProvider) => Promise<void>,
  onSignIn: (email: string, password: string) => Promise<void>,
  onSignOut: () => void,
|};

const contextDefault: Context = {
  auth: null,
  loading: false,
  environment,
  onResetError: () => {},
  onMyBooking: () => Promise.resolve(),
  onRegister: () => Promise.resolve(),
  onSocialAuth: () => Promise.resolve(),
  onSignIn: () => Promise.resolve(),
  onSignOut: () => {},
};

export const { Consumer, Provider } = React.createContext(contextDefault);
