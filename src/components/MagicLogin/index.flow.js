// @flow

import * as React from "react";

import type { LoginType as LoginType_, Screen as Screen_ } from "./types";
import type { SignInUser as SignInUser_ } from "./mutations/__generated__/SignInUser.graphql";

export type LoginType = LoginType_;
export type Screen = Screen_;
export type SignInUser = SignInUser_;

type Props = {|
  onSocialLogin: (provider: "google" | "facebook") => Promise<any>,
  initialScreen: "intro" | "signUp",
  type: LoginType,
  onClose: () => void,
  onSignIn: (graphQLUser: SignInUser) => void,
|};

declare export default React.ComponentType<Props>;
