// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Months from "../Months";

const NOW = new Date(Date.UTC(2020, 0, 1));

const months = Array(12)
  .fill(0)
  .map((val, i) => val + i);

describe("#Months", () => {
  test("render", () => {
    const wrapper = shallow(<Months id="kek" value={NOW} onChange={jest.fn()} months={months} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("handle change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Months id="kek" value={NOW} onChange={onChange} months={months} />);

    wrapper.find("#kek-month").simulate("change", { target: { value: "10" } });

    expect(onChange).toBeCalledWith({ target: { value: "10" } });
  });
});
