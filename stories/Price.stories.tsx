import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs/react";

import withData from "./decorators/withData";
import Price from "../src/components/Price";

const GROUP_ID = "Component";

storiesOf("Price", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("default", () => <Price value={number("Price", 1337, GROUP_ID)} />);
