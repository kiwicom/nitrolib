// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";

import HeaderLinks from "../src/components/HeaderLinks";
import withData from "./decorators/withData";

const providers = ["none", "lastminute", "holidays"];

const GROUP_ID = "Navbar";

storiesOf("HeaderLinks", module)
  .addDecorator(withData)
  .add("default", () => <HeaderLinks provider={select("Provider", providers, "none", GROUP_ID)} />);
