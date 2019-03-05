// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";

import withData from "./decorators/withData";
import { data } from "../src/components/YourPackage/mockedData";
import YourPackage from "../src/components/YourPackage";

storiesOf("YourPackage", module)
  .addDecorator(withData)
  .add("default", () => <YourPackage package={data} />)
  .add("search", () => <YourPackage package={data} search />)
  .add("calculating price", () => <YourPackage isCalculatingPrice package={data} search />);
