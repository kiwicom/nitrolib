// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";

import withData from "./decorators/withData";
import Starred from "../src/components/Starred";

storiesOf("Starred", module)
  .addDecorator(withData)
  .add("basic", () => <Starred positionMenuDesktop={0} positionMenuTablet={0} inverted={false} />);
