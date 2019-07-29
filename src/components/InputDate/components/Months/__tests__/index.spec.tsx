import * as React from "react";
import { shallow } from "enzyme";

import { intlDefault } from "../../../../../records/Intl";

import Months from "..";

const NOW = new Date(Date.UTC(2020, 0, 1));

const months = Array(12)
  .fill(0)
  .map((val, i) => val + i);

describe("#Months", () => {
  test("render", () => {
    const wrapper = shallow(<Months id="kek" value={NOW} onChange={jest.fn()} months={months} />);

    expect(wrapper.prop("children")(intlDefault)).toBeDefined();
  });

  test("handle change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Months id="kek" value={NOW} onChange={onChange} months={months} />);

    const core = shallow(wrapper.prop("children")(intlDefault));
    core.find("#kek-month").simulate("change", { target: { value: "10" } });

    expect(onChange).toBeCalledWith({ target: { value: "10" } });
  });
});
