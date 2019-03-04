// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import GpsIcon from "@kiwicom/orbit-components/lib/icons/Gps";

import LocationPicker from "../src/components/LocationPicker";

const iataValue = {
  id: "FLL",
  name: "Fort Lauderdale–Hollywood International",
  code: "FLL",
  slug: "fort-lauderdale-hollywood-international-fort-lauderdale-florida-united-states",
  location: { lat: 26.0725, lng: -80.152778 },
  type: "airport",
  city: {
    id: "fort-lauderdale_fl_us",
    name: "Fort Lauderdale",
    slug: "fort-lauderdale-florida-united-states",
    code: "FLL",
  },
  country: {
    id: "US",
    name: "United States",
    slug: "united-states",
    code: "US",
  },
};

storiesOf("LocationPicker", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <LocationPicker value={null} onChange={action("change")} label={text("Label", "From")} />
  ))
  .add("only airports", () => (
    <LocationPicker value={null} locationType="airport" onChange={action("change")} label={text("Label", "From")} />
  ))
  .add("with icon", () => (
    <LocationPicker
      value={iataValue}
      icon={<GpsIcon />}
      onChange={action("change")}
      label={text("Label", "From")}
    />
  ))
  .add("datasource holidays", () => (
    <LocationPicker
      queryName="holidaysLocations"
      value={{ name: "initial value" }}
      onChange={action("change")}
      label={text("Label", "From")}
    />
  ));
