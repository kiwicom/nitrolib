// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import Mobile from "../src/components/Mobile";

storiesOf("Mobile", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <>
      <h1>Resize the window!</h1>
      <Mobile>Kek!</Mobile>
    </>
  ));
