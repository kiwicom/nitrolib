// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountSocialLogin from "../src/components/AccountSocialLogin";
import withData from "./decorators/withData";

const defaultProps = {
  onAskSignInLink: () => {},
  onSocialLogin: () => {},
  email: "email@example.com",
};

storiesOf("AccountSocialLogin", module)
  .addDecorator(withData)
  .add("Facebook", () => <AccountSocialLogin {...defaultProps} pairedWith="facebook" />)
  .add("Google", () => <AccountSocialLogin {...defaultProps} pairedWith="google" />);
