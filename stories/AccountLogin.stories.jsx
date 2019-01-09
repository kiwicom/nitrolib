// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountLogin from "../src/components/AccountLogin";
import withData from "./decorators/withData";
import Text from "../src/components/Text";

storiesOf("AccountLogin", module)
  .addDecorator(withData)
  .add("default", () => (
    <AccountLogin
      email=""
      error={<Text t="account.submit_error.general" />}
      onNoAccount={() => {}}
      onEmailChange={() => {}}
      onFacebookLogin={() => {}}
      onGoogleLogin={() => {}}
      onContinue={() => {}}
    />
  ));
