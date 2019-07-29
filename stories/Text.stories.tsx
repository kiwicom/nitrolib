import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";

import Text from "../src/components/Text";
import withData from "./decorators/withData";

const GROUP_ID = "Component";

storiesOf("Text", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("default", () => <Text t={text("Key", "common.ok", GROUP_ID)} />);
