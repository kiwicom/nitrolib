// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountSocialLogin from "../src/components/AccountSocialLogin";
import withData from "./decorators/withData";

storiesOf("AccountSocialLogin", module)
  .addDecorator(withData)
  .add("default", () => (
    <AccountSocialLogin
      onAskSignInLink={() => {}}
      onFacebookLogin={() => {}}
      onGoogleLogin={() => {}}
      email="email@example.com"
    />
  ));
