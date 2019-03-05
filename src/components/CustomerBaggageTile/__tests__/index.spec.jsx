// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CustomerBaggageTile from "../index";
import data from "../services/data";

const props = {
  firstName: "Oliver",
  middleName: undefined,
  lastName: "Dlouhy",
  gender: "male",
  dayOfBirth: undefined,
  isProcessing: false,
  current: { handBag: 1, holdBag: 1 },
  selected: { handBag: 3, holdBag: 4 },
  definitions: undefined,
  onClick: () => console.log("clicked"), // eslint-disable-line
  baggage: data,
};

describe("#CustomerBaggageTile", () => {
  test("renders", () => {
    const wrapper = shallow(<CustomerBaggageTile {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
