// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import TileContent from "../index";

const props = {
  handBags: [
    {
      category: "cabinBag",
      restrictions: {
        weight: 5,
        height: 20,
        width: 20,
        length: 20,
        dimensionsSum: null,
      },
    },
  ],
  holdBags: [
    {
      category: "holdBag",
      restrictions: {
        weight: 25,
        height: 60,
        width: 30,
        length: 70,
        dimensionsSum: null,
      },
    },
  ],
  orderStatus: "notAvailable",
};

describe("#TileContent", () => {
  test("renders no personal item", () => {
    const wrapper = shallow(<TileContent {...props} />);
    expect(wrapper.find("BaggagePersonalItemNone").exists()).toBe(true);
  });
  test("renders contact us text", () => {
    const wrapper = shallow(<TileContent {...props} />);
    expect(wrapper.find("TileContent__ContactUsText").exists()).toBe(true);
  });
});
