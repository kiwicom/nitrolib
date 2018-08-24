// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs/react";

import Language from "../src/components/Language";

storiesOf("Language", module)
  .addDecorator(withKnobs)
  .add("regular", () => <Language onChange={action("change")} />)
  .add("flat", () => <Language onChange={action("change")} flat />)
  .add("native", () => <Language onChange={action("change")} native />);
