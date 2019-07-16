// @flow strict
import * as React from "react";
import type { Environment } from "@kiwicom/relay";

import type { Auth, SocialProvider } from "../../records/Auth";
import environment from "../environment";
import type { MyBookingInput, RegisterInput } from "./api";

export type Context = {|
  auth: Auth | null,
  loading: boolean,
  environment: Environment,
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
  onMyBooking: () => Promise.resolve(),
  onRegister: () => Promise.resolve(),
  onSocialAuth: () => Promise.resolve(),
  onSignIn: () => Promise.resolve(),
  onSignOut: () => {},
};

const context: React.Context<Context> = React.createContext(contextDefault);

export const { Consumer, Provider } = context;

export const useAuth = () => React.useContext(context);

export default context;
