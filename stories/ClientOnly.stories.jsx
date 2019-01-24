// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import ClientOnly from "../src/components/ClientOnly";

storiesOf("ClientOnly", module)
  .addDecorator(withKnobs)
  // eslint-disable-next-line jsx-a11y/accessible-emoji
  .add("default", () => <ClientOnly>This story is useless 🤷‍‍️</ClientOnly>);
