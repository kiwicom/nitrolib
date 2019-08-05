// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import LogMount from "../src/components/LogMount";

const event = {
  action: "Lol",
  category: "General",
  destinations: {
    bigQuery: false,
    exponea: false,
    logmole: false,
    ga: false,
  },
};

storiesOf("LogMount", module)
  .addDecorator(withKnobs)
  .add("default", () => <LogMount event={event} props={{ lol: "Kek" }} />);
