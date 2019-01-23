// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountPassword from "../src/components/AccountPassword";
import withData from "./decorators/withData";

storiesOf("AccountPassword", module)
  .addDecorator(withData)
  .add("default", () => (
    <AccountPassword
      onAskSignInLink={() => {}}
      onChangeEmail={() => {}}
      onPasswordChange={() => {}}
      onForgotPassword={() => {}}
      onSignIn={() => {}}
      password="asdfg"
      email="example@example.com"
      brandName="Kiwi.com"
    />
  ))
  .add("loading", () => (
    <AccountPassword
      onAskSignInLink={() => {}}
      onChangeEmail={() => {}}
      onPasswordChange={() => {}}
      onForgotPassword={() => {}}
      onSignIn={() => {}}
      password="asdfg"
      email="example@example.com"
      brandName="Kiwi.com"
      isSigningIn
      isSendingEmail
    />
  ));
