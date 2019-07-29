import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import Value from "../src/components/Value";

storiesOf("Value", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <Value initial="Click stuff">
      {({ value, onChange }) => (
        <>
          <h3>{value}</h3>
          <button type="button" onClick={() => onChange("Kek")}>
            Kek
          </button>
          <button type="button" onClick={() => onChange("Lol")}>
            Lol
          </button>
          <button type="button" onClick={() => onChange("Bur")}>
            Bur
          </button>
        </>
      )}
    </Value>
  ));
