// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { text } from "@storybook/addon-knobs/react";

import withData from "./decorators/withData";
import InputPhone from "../src/components/InputPhone";

const GROUP_ID = "Component";

storiesOf("InputPhone", module)
  .addDecorator(withInfo({ inline: true }))
  .addDecorator(withData)
  .add("default", () => (
    <InputPhone
      id="test"
      value={text("Value", "", GROUP_ID)}
      error={(text("Error"), "", GROUP_ID)}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      placeholder={text("Placeholder", "Gib text", GROUP_ID)}
    />
  ));
