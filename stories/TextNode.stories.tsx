import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TextNode from "../src/components/TextNode";

storiesOf("TextNode", module).add("default", () => (
  <TextNode
    t="Kek __x__ bur __y__."
    values={{
      x: (
        <button type="button" onClick={action("Click")}>
          button
        </button>
      ),
      y: <b>bold</b>,
    }}
  />
));
