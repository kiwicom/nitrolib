// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";

import PhoneNumber from "../src/components/PhoneNumber";

const GROUP_ID = "Component";

storiesOf("PhoneNumber", module)
  .addDecorator(withKnobs)
  .add("default", () => <PhoneNumber tel={text("phone", "+34642424242", GROUP_ID)} />);
