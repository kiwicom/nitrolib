// @flow strict

import * as React from "react";
import { mount } from "enzyme";

import DateInput from "../index";

describe("#DateInput", () => {
  test("render", () => {
    const component = mount(<DateInput label="Select date" onChange={jest.fn()} />);
    expect(component.find("input")).toHaveLength(2);
    expect(component.find("select")).toHaveLength(1);
  });

  test("handle changes", () => {
    const onChange = jest.fn();
    const component = mount(
      <DateInput label="Select date" onChange={onChange} value={new Date(2020, 0, 20)} />,
    );

    component
      .find(`[data-test="DateInput-Month"]`)
      .simulate("change", { target: { value: "11", name: "month" } });
    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
  });

  test("handles invalid day of month", () => {
    const onChange = jest.fn();
    const component = mount(
      <DateInput label="Select date" onChange={onChange} value={new Date(2020, 0, 20)} />,
    );

    component
      .find(`input[data-test="DateInput-Date"]`)
      .simulate("change", { target: { value: "32", name: "date" } });
    expect(onChange).toHaveBeenCalledWith(null);
  });

  test("handles invalid year", () => {
    const onChange = jest.fn();
    const component = mount(<DateInput label="Select date" onChange={onChange} />);

    const dateInput = component.find(`input[data-test="DateInput-Date"]`);
    const monthInput = component.find(`[data-test="DateInput-Month"]`);
    const yearInput = component.find(`input[data-test="DateInput-Year"]`);

    // simulate user filling all three inputs, with incorrect year
    dateInput.simulate("change", { target: { value: "10", name: "date" } });
    dateInput.simulate("blur", { name: "date" });
    monthInput.simulate("change", { target: { value: "10", name: "month" } });
    monthInput.simulate("blur", { name: "month" });
    yearInput.simulate("change", { target: { value: "10", name: "year" } });
    yearInput.simulate("blur", { name: "year" });

    expect(onChange).toHaveBeenCalledWith(null);
    expect(component.find("InputGroup").prop("error")).toBe("forms.errors.invalid_date");
  });
});
