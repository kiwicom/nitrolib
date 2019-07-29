import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";

import Button from "../src/components/Button";
import withData from "./decorators/withData";

const GROUP_ID = "Component";

storiesOf("Button", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("default", () => <Button t={text("Key", "common.ok", GROUP_ID)} />);
