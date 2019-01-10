// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs/react";

import SideBar from "../src/components/SideBar";
import withData from "./decorators/withData";

const props = {
  shown: true,
  inverted: false,
  onClick: action("clicked"),
};

storiesOf("SideBar", module)
  .addDecorator(withData, withKnobs)
  .add("default", () => <SideBar {...props}>test</SideBar>)
  .add("without mask", () => (
    <SideBar {...props} unmasked>
      test
    </SideBar>
  ))
  .add("inverted", () => (
    <SideBar {...props} inverted>
      test
    </SideBar>
  ));
