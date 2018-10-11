// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import AccountCheckEmail from "../src/components/AccountCheckEmail";
import withData from "./decorators/withData";

storiesOf("AccountCheckEmail", module)
  .addDecorator(withData)
  .add("default", () => <AccountCheckEmail email="" reason="magicLink" />);
