// @flow strict

import * as React from "react";
import { mount } from "enzyme";

import DateInput from "../index";

describe("#DateInput", () => {
  test("render", () => {
    const component = mount(<DateInput label="Select date" onChange={jest.fn()} value={null} />);
    expect(component.find("input")).toHaveLength(2);
    expect(component.find("select")).toHaveLength(1);
  });

  test("handle changes", () => {
    const onChange = jest.fn();
    const component = mount(
      <DateInput label="Select date" onChange={onChange} value={new Date(2020, 0, 20)} />,
    );

    component.find(`[data-test="DateInput-Month"]`).simulate("change", { target: { value: "11" } });
    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
  });
});
