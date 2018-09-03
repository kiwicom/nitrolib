// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Language from "../src/components/Language";
import withData from "./decorators/withData";

storiesOf("Language", module)
  .addDecorator(withData)
  .add("regular", () => <Language onChange={action("change")} />)
  .add("flat", () => <Language onChange={action("change")} flat />)
  .add("native", () => <Language onChange={action("change")} native />);
