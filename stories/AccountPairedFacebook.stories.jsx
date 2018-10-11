// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountPairedFacebook from "../src/components/AccountPairedFacebook";
import withData from "./decorators/withData";

storiesOf("AccountPairedFacebook", module)
  .addDecorator(withData)
  .add("default", () => (
    <AccountPairedFacebook
      onAskSignInLink={() => {}}
      onFacebookLogin={() => {}}
      email="email@example.com"
    />
  ));
