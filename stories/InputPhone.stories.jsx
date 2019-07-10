// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { text } from "@storybook/addon-knobs/react";

import InputEmail from "../src/components/InputPhone";

const GROUP_ID = "Component";

storiesOf("InputPhone", module)
  .addDecorator(withInfo({ inline: true }))
  .add("default", () => (
    <InputEmail
      id="test"
      value={text("Value", "", GROUP_ID)}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      placeholder={text("Placeholder", "Gib text", GROUP_ID)}
    />
  ));
