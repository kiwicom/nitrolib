// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import Rooms from "../src/components/Rooms";
import withData from "./decorators/withData";

const props = {
  rooms: [
    {
      id: "1",
      description: "1x Deluxe Room with Free Daily Activities; 2x Adult, 1x Child; Half board",
    },
    {
      id: "2",
      description: "1x Deluxe Pool View Room with Free Daily Activities; 1x Adult",
    },
    {
      id: "3",
      description: "1x Deluxe Pool View Room with Free Daily Activities; 1x Adult",
    },
  ],
};

storiesOf("Rooms", module)
  .addDecorator(withData)
  .add("default", () => <Rooms {...props} />);
