// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Dates from "../../Dates";

const NOW = new Date(Date.UTC(2020, 0, 1));

const dates = Array(31)
  .fill(1)
  .map((val, i) => val + i);

describe("#Dates", () => {
  test("render", () => {
    const wrapper = shallow(<Dates id="kek" value={NOW} onChange={jest.fn()} dates={dates} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("handle change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Dates id="kek" value={NOW} onChange={onChange} dates={dates} />);

    wrapper.find("#kek-date").simulate("change", { target: { value: "10" } });

    expect(onChange).toBeCalledWith({ target: { value: "10" } });
  });
});
