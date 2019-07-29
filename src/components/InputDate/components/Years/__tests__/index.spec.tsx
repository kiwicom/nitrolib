import * as React from "react";
import { shallow } from "enzyme";

import Years from "..";

const NOW = new Date(Date.UTC(2020, 0, 1));

const years = Array(5)
  .fill(0)
  .map((val, i) => val + i + 2017);

describe("#Years", () => {
  test("render", () => {
    const wrapper = shallow(<Years id="kek" value={NOW} onChange={jest.fn()} years={years} />);

    expect(wrapper.find("Select").exists()).toBe(true);
  });

  test("handle change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Years id="kek" value={NOW} onChange={onChange} years={years} />);

    wrapper.find("#kek-year").simulate("change", { target: { value: "2020" } });

    expect(onChange).toBeCalledWith({ target: { value: "2020" } });
  });
});
