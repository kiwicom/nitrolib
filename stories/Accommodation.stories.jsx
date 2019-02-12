// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import accommodation from "../src/components/Accommodation/mockedData";
import Accommodation from "../src/components/Accommodation";
import withData from "./decorators/withData";

storiesOf("Accommodation", module)
  .addDecorator(withData)
  .add("default", () => <Accommodation {...accommodation} />);
