// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BaggageItem from "..";

const passengers = [
  {
    paxId: 1,
    firstName: "Barrack",
    middleName: "Hussein",
    lastName: "Obama",
  },
  {
    paxId: 2,
    firstName: "Donald",
    middleName: "John",
    lastName: "Trump",
  },
  {
    paxId: 3,
    firstName: "George",
    lastName: "Bush",
  },
];

const props = {
  restrictions: {
    weight: 15,
    height: 30,
    width: 60,
    length: 30,
    dimensionsSum: null,
  },
  category: "holdBag",
  context: "booking",
  amount: 2,
};

describe("#BaggageItem", () => {
  test("renders ", () => {
    const wrapper = shallow(<BaggageItem {...props} />);

    expect(
      wrapper
        .find("Stack")
        .first()
        .prop("dataTest"),
    ).toBe("BaggageOverview-BaggageItem-holdBag");
  });

  test("renders with passengers names", () => {
    const wrapper = shallow(<BaggageItem {...props} passengers={passengers} />);

    expect(
      wrapper
        .find("Text")
        .at(1)
        .prop("dataTest"),
    ).toBe("BaggageOverview-BaggageItem-Passengers");

    expect(
      wrapper
        .find("Text")
        .at(1)
        .dive()
        .text(),
    ).toBe("B. H. Obama, D. J. Trump, G. Bush");
  });
});
