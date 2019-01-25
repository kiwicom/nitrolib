// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import Value from "../src/components/Value";
import ValueBind from "../src/components/ValueBind";

storiesOf("ValueBind", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <Value initial="Click stuff">
      {({ value, onChange }) => (
        <>
          <h3>{value}</h3>
          <ValueBind value="Kek" onChange={onChange}>
            {({ onClick }) => (
              <button type="button" onClick={onClick}>
                Kek
              </button>
            )}
          </ValueBind>
          <ValueBind value="Lol" onChange={onChange}>
            {({ onClick }) => (
              <button type="button" onClick={onClick}>
                Lol
              </button>
            )}
          </ValueBind>
          <ValueBind value="Bur" onChange={onChange}>
            {({ onClick }) => (
              <button type="button" onClick={onClick}>
                Bur
              </button>
            )}
          </ValueBind>
        </>
      )}
    </Value>
  ));
