// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import HotelInfo from "../src/components/HotelInfo";
import withData from "./decorators/withData";

const props = {
  hotel: {
    name: "Golden Rock Coast Hotel",
    rating: 3,
    photoUrl: "https://satyr.io/320x213-240",
    address: { fullAddress: "Golden Rock Coast Hotel, City centre of Ubud 23" },
    isMMB: false,
  },
};

storiesOf("Hotel Info", module)
  .addDecorator(withData)
  .add("default", () => <HotelInfo {...props} onShownOnMapClick={() => {}} />);
