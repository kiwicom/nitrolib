// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";

import Day from "../src/components/Day";
import withData from "./decorators/withData";

storiesOf("Day", module)
  .addDecorator(withData)
  .add("a day", () => <Day date={new Date(Date.UTC(2018, 9, 28))} />);
