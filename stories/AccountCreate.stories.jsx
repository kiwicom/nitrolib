// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountCreate from "../src/components/AccountCreate";
import withData from "./decorators/withData";

storiesOf("AccountCreate", module)
  .addDecorator(withData)
  .add("default", () => (
    <AccountCreate
      email=""
      password=""
      passwordConfirm=""
      onNoAccount={() => {}}
      onEmailChange={() => {}}
      onPasswordChange={() => {}}
      onPasswordConfirmChange={() => {}}
      onContinue={() => {}}
      onTermsOfUse={() => {}}
      onPrivacyPolicy={() => {}}
    />
  ));
