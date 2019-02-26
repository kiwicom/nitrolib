// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import withData from "./decorators/withData";
import Accommodation from "../src/components/Accommodation";
import mockedData from "../src/components/Accommodation/mockedData";

storiesOf("Accommodation", module)
  .addDecorator(withData)
  .add("default", () => <Accommodation {...mockedData} />);
