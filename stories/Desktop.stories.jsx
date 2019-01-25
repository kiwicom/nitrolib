// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import Desktop from "../src/components/Desktop";

storiesOf("Desktop", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <>
      <h1>Resize the window!</h1>
      <Desktop>Kek!</Desktop>
    </>
  ));
