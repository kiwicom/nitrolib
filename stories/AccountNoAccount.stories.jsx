// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountNoAccount from "../src/components/AccountNoAccount";
import withData from "./decorators/withData";

storiesOf("AccountNoAccount", module)
  .addDecorator(withData)
  .add("default", () => (
    <AccountNoAccount
      brandName="Kiwi.com"
      onBack={() => {}}
      onRegister={() => {}}
      onFacebookLogin={() => {}}
      onGoogleLogin={() => {}}
    />
  ));
