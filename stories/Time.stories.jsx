// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import Time from "../src/components/Time";

storiesOf("Time", module)
  .addDecorator(withKnobs)
  .add("default", () => <Time time={new Date(Date.UTC(0, 0, 0, 10, 30))} />);
