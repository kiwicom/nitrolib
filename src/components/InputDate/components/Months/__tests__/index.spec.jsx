// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Months from "..";

const NOW = new Date(Date.UTC(2020, 0, 1));

const months = Array(12)
  .fill(0)
  .map((val, i) => val + i);

describe("#Months", () => {
  test("render", () => {
    const wrapper = shallow(<Months value={NOW} onChange={jest.fn()} months={months} />);

    expect(wrapper.find("Select")).toBeDefined();
  });

  test("handle change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Months value={NOW} onChange={onChange} months={months} />);

    wrapper.find("Select").simulate("change", { target: { value: "10" } });

    expect(onChange).toBeCalledWith({ target: { value: "10" } });
  });
});
