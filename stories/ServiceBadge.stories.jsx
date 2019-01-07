// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";

import ServiceBadge from "../src/components/ServiceBadge";

storiesOf("ServiceBadge", module)
  .addDecorator(withKnobs)
  .add("default", () => <ServiceBadge premium={boolean("Premium", false)} />);
