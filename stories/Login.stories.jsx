// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import Login from "../src/components/Login";
import withData from "./decorators/withData";

storiesOf("Login", module)
  .addDecorator(withData)
  .add("default", () => <Login />);
