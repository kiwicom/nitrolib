import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";

import ClickOutside from "../src/components/ClickOutside";

const GROUP_ID = "Component";

storiesOf("ClickOutside", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <ClickOutside active={boolean("Active", true, GROUP_ID)} onClickOutside={action("Click!")}>
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
        Click outside
      </div>
    </ClickOutside>
  ));
