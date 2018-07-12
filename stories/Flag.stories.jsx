// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";

import Flag from "../src/components/Flag";

storiesOf("Flag", module)
  .addDecorator(withKnobs)
  .add("default", () => <Flag country={text("Country", "sk")} />);
