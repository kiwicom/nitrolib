// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountLogin from "../src/components/AccountLogin";
import withData from "./decorators/withData";
import Text from "../src/components/Text";

const commonProps = {
  email: "",
  error: <Text t="common.api_error" />,
  onEmailChange: () => {},
  onFacebookLogin: () => {},
  onGoogleLogin: () => {},
  onContinue: () => {},
};

storiesOf("AccountLogin", module)
  .addDecorator(withData)
  .add("default", () => <AccountLogin {...commonProps} />)
  .add("Help", () => <AccountLogin {...commonProps} type="help" />)
  .add("Refer A Friend", () => <AccountLogin {...commonProps} type="refer" />);
