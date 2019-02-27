// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { baggageData } from "../../BaggagePicker/services/data";
import BaggageOverview from "../index";

const passengers = [
  {
    id: 1,
    firstName: "Barrack",
    lastName: "Obama",
    baggage: {
      holdBag: 1,
      handBag: 3,
    },
  },
  {
    id: 2,
    firstName: "Donald",
    lastName: "Trump",
    baggage: {
      holdBag: 1,
      handBag: 4,
    },
  },
  {
    id: 3,
    firstName: "George",
    lastName: "Bush",
    baggage: {
      holdBag: 0,
      handBag: 2,
    },
  },
];

const props = {
  passengers,
  baggage: baggageData,
  currentPassengerId: undefined,
};

describe("#BaggageOverview", () => {
  test("render ", () => {
    const wrapper = shallow(<BaggageOverview {...props} />);
    expect(wrapper.find("BaggageOverview__Wrapper").exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
