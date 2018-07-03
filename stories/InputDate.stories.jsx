// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, date, boolean } from "@storybook/addon-knobs/react";

import InputDate from "public/components/InputDate";

const now = new Date();

storiesOf("InputDate", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <InputDate
      id="default"
      value={date("Value", now)}
      onChange={action("Change")}
      min={date("Min", new Date(Date.UTC(1950, 0)))}
      max={date("Max", new Date(Date.UTC(2050, 0)))}
      mmddyyyy={boolean("MM/DD/YYYY", false)}
    />
  ));
