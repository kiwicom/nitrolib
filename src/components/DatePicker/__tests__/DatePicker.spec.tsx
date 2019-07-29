import * as React from "react";
import { mount } from "enzyme";

import DatePicker from "..";

describe("#DatePicker", () => {
  test("viewing prop", () => {
    const wrapper = mount(
      <DatePicker
        value={new Date()}
        onChange={jest.fn()}
        label="Departure"
        min={new Date(Date.UTC(2019, 0))}
        max={new Date(Date.UTC(2019, 6))}
      />,
    );

    const newDate = new Date(new Date(Date.UTC(2019, 2, 6)));

    wrapper.setState({ active: true, viewing: newDate });
    expect(wrapper.find("Calendar").prop("viewing")).toBe(newDate);
  });

  test("check active", () => {
    const wrapper = mount(
      <DatePicker
        value={new Date()}
        onChange={jest.fn()}
        label="Departure"
        min={new Date(Date.UTC(2019, 0))}
        max={new Date(Date.UTC(2019, 6))}
      />,
    );
    wrapper.setState({ active: true });
    expect(wrapper.find("DatePickerWrapper").prop("active")).toBe(true);
  });
});
