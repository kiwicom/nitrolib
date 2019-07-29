import * as React from "react";
import { storiesOf } from "@storybook/react";

import TranslateRef from "../src/components/TranslateRef";

storiesOf("TranslateRef", module).add("default", () => (
  <TranslateRef t="Make <ref>kek</ref> bold again!" render={text => <b>{text}</b>} />
));
