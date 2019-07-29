import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs/react";

import IataPicker from "../src/components/IataPicker";
import withData from "./decorators/withData";

const GROUP_ID = "Component";

storiesOf("IataPicker", module)
  .addDecorator(withData)
  .add("default", () => (
    <IataPicker
      id="test"
      value={text("Value", , GROUP_ID)}
      onSelect={action("Select")}
      error={text("Error", , GROUP_ID)}
    />
  ));
