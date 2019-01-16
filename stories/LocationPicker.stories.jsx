// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import GpsIcon from "@kiwicom/orbit-components/lib/icons/Gps";

import LocationPicker from "../src/components/LocationPicker";

storiesOf("LocationPicker", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <LocationPicker
      value={null}
      onChange={action("change")}
      icon={<GpsIcon />}
      label={text("Label", "From")}
    />
  ));
