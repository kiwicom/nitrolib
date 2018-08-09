// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import Language from "../src/components/Language";

storiesOf("Language", module)
  .addDecorator(withKnobs)
  .add("regular", () => <Language onChange={() => console.log("change")} />)
  .add("flat", () => <Language onChange={() => console.log("change")} flat />)
  .add("native", () => <Language onChange={() => console.log("change")} native />);
