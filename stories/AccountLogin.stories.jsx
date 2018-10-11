// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountLogin from "../src/components/AccountLogin";
import withData from "./decorators/withData";

storiesOf("AccountLogin", module)
  .addDecorator(withData)
  .add("default", () => (
    <AccountLogin
      email=""
      onNoAccount={() => {}}
      onEmailChange={() => {}}
      onFacebookLogin={() => {}}
      onGoogleLogin={() => {}}
      onContinue={() => {}}
    />
  ));
