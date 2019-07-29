import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import withData from "./decorators/withData";
import ModalsAuth from "../src/components/ModalsAuth";

storiesOf("ModalsAuth", module)
  .addDecorator(withKnobs)
  .addDecorator(withData)
  .add("default", () => <ModalsAuth portal= />);
