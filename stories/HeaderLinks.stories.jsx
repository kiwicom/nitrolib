// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import HeaderLinks from "../src/components/HeaderLinks";

storiesOf("HeaderLinks", module)
  .addDecorator(withKnobs)
  .add("default", () => <HeaderLinks />);
