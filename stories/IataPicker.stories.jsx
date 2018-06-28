// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs/react";

import IataPicker from "client/public/components/IataPicker";

storiesOf("IataPicker", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <IataPicker
      id="test"
      value={text("Value", "")}
      onSelect={action("Select")}
      error={text("Error", "")}
    />
  ));
