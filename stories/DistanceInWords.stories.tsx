import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import DistanceInWords from "../src/components/DistanceInWords";

storiesOf("DistanceInWords", module)
  .addDecorator(withKnobs)
  .add("default", () => <DistanceInWords from={new Date(2015, 0, 1)} to={new Date(2016, 0, 1)} />);
