// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Dates from "..";

const NOW = new Date(Date.UTC(2020, 0, 1));

const dates = Array(31)
  .fill(1)
  .map((val, i) => val + i);

describe("#Dates", () => {
  test("render", () => {
    const wrapper = shallow(<Dates value={NOW} onChange={jest.fn()} dates={dates} />);

    expect(wrapper.find("Select").exists()).toBe(true);
  });

  test("handle change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Dates value={NOW} onChange={onChange} dates={dates} />);

    wrapper.find("Select").simulate("change", { target: { value: "10" } });

    expect(onChange).toBeCalledWith({ target: { value: "10" } });
  });
});
