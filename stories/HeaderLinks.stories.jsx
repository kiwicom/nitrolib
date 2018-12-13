// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import { props } from "../src/components/HeaderLinks/__mocks__";
import HeaderLinks from "../src/components/HeaderLinks";
import withData from "./decorators/withData";

storiesOf("HeaderLinks", module)
  .addDecorator(withData)
  .add("default", () => <HeaderLinks {...props} />);
