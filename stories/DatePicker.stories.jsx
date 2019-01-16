// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, date } from "@storybook/addon-knobs/react";

import DatePicker from "../src/components/DatePicker";

const GROUP_ID = "Component";

storiesOf("DatePicker", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <DatePicker
      label="Departure"
      onChange={action("Change")}
      min={date("Min", new Date(Date.UTC(2019, 0)), GROUP_ID)}
      max={date("Max", new Date(Date.UTC(2019, 6)), GROUP_ID)}
      value={date("Value", new Date(Date.now()), GROUP_ID)}
    />
  ));
