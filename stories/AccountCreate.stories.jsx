// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountCreate from "../src/components/AccountCreate";
import withData from "./decorators/withData";
import Text from "../src/components/Text";

storiesOf("AccountCreate", module)
  .addDecorator(withData)
  .add("default", () => (
    <AccountCreate
      email=""
      password=""
      passwordConfirm=""
      onEmailChange={() => {}}
      onPasswordChange={() => {}}
      onPasswordConfirmChange={() => {}}
      onContinue={() => {}}
    />
  ))
  .add("errors", () => (
    <AccountCreate
      email=""
      password=""
      passwordConfirm=""
      onEmailChange={() => {}}
      onPasswordChange={() => {}}
      onPasswordConfirmChange={() => {}}
      onContinue={() => {}}
      error={<Text t="account.password_too_simple" />}
      emailError="Incorrect format of e-mail"
      passwordError="Password too simple"
      passwordConfirmError="Passwords doesn't match"
      isLoading
    />
  ));
