import * as React from "react";
import { storiesOf } from "@storybook/react";

import TravelDates from "../src/components/TravelInfo/components/TravelDates";
import withData from "./decorators/withData";

const props = {
  data: {
    from: "Fri 20 Nov",
    to: "Sun 4 Dec",
  },
};

storiesOf("TravelDates", module)
  .addDecorator(withData)
  .add("default", () => <TravelDates {...props} />);
