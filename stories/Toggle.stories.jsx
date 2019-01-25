// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import Toggle from "../src/components/Toggle";

storiesOf("Toggle", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <Toggle>
      {({ open, onToggle }) => (
        <>
          <h3>{open ? "Open" : "Closed"}</h3>
          <button type="button" onClick={onToggle}>
            Toggle
          </button>
        </>
      )}
    </Toggle>
  ));
