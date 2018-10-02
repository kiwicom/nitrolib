// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import Password from "../src/components/Password";
import withData from "./decorators/withData";

storiesOf("Password", module)
  .addDecorator(withData)
  .add("default", () => <Password email="example@example.com" />);
