// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import HotelInfo from "../src/components/HotelInfo";
import withData from "./decorators/withData";
import mockedData from "../src/components/Accommodation/mockedData";

const props = {
  hotel: {
    name: "Golden Rock Coast Hotel",
    rating: 5,
    photoUrl: "https://satyr.io/320x213-240",
    address: { fullAddress: "Golden Rock Coast Hotel, City centre of Ubud 23" }
  }
};

storiesOf("Hotel Info", module)
  .addDecorator(withData)
  .add("default", () => <HotelInfo {...props} onShownOnMapClick={() => {}} />);
