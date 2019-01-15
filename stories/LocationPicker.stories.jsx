// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text } from "@storybook/addon-knobs/react";
import * as Icons from "@kiwicom/orbit-components/lib/icons";
import GpsIcon from "@kiwicom/orbit-components/lib/icons/Gps";

import LocationPicker from "../src/components/LocationPicker";

storiesOf("LocationPicker", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <LocationPicker icon={<GpsIcon />} label="From" error={text("Error", "")} />
  ))
  .add("Playground", () => {
    const selectIcon = select("Icon", Object.keys(Icons), "Gps");
    const Icon = Icons[selectIcon];
    return <LocationPicker icon={<Icon />} label="To" error={text("Error", "")} />;
  });
