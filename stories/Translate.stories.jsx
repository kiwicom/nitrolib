// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";

import Translate from "../src/components/Translate";
import withData from "./decorators/withData";

const GROUP_ID = "Component";

storiesOf("Translate", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("default", () => <Translate t={text("Key", "common.ok", GROUP_ID)} />);
