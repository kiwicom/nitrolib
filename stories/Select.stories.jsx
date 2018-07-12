// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs/react";

import Select from "../src/components/Select";

const options = {
  lol: "Lol",
  kek: "Kek",
  bur: "Bur",
};

storiesOf("Select", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <Select id="select" value={select("Value", options, "lol")} onChange={action("Change")}>
      <option value="lol">Lol</option>
      <option value="kek">Kek</option>
      <option value="bur">Bur</option>
    </Select>
  ));
