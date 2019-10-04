// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, date, text } from "@storybook/addon-knobs/react";
import GpsNotFixed from "@kiwicom/orbit-components/lib/icons/GpsNotFixed";

import DatePicker from "../src/components/DatePicker";

const GROUP_ID = "Component";

const NOW = new Date(Date.now());

storiesOf("DatePicker", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <DatePicker
      value={date("Value", NOW, GROUP_ID)}
      onChange={action("Change")}
      label={text("Label", "Departure", GROUP_ID)}
      min={date("Min", new Date(Date.UTC(2019, 0)), GROUP_ID)}
      max={date("Max", new Date(Date.UTC(2019, 6)), GROUP_ID)}
    />
  ))
  .add("with icon", () => (
    <DatePicker
      value={date("Value", NOW, GROUP_ID)}
      onChange={action("Change")}
      label={text("Label", "Departure", GROUP_ID)}
      icon={<GpsNotFixed />}
      min={date("Min", new Date(Date.UTC(2019, 0)), GROUP_ID)}
      max={date("Max", new Date(Date.UTC(2019, 6)), GROUP_ID)}
    />
  ));
