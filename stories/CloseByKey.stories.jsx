// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs/react";

import CloseByKey from "../src/components/CloseByKey";

storiesOf("CloseByKey", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <CloseByKey onClose={action("Close")}>
      <div
        style={{
          background: "crimson",
          width: 300,
          height: 300,
          margin: 50,
          padding: 50,
          color: "white",
        }}
      >
        Press ESC
      </div>
    </CloseByKey>
  ));
