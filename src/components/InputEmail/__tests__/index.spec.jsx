// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import InputEmail from "..";

describe("#InputEmail", () => {
  test("render", () => {
    const wrapper = shallow(
      <InputEmail id="test" value="johndoe@gmail.com" error="" onChange={jest.fn()} />,
    );

    expect(wrapper.find("InputField").exists()).toBe(true);
  });

  test("error wrong format", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<InputEmail id="test" value="" error="" onChange={onChange} />);

    wrapper.simulate("change", { target: { value: "keket@-.com" } });
    expect(onChange).toBeCalledWith({
      error: "booking.passenger.email.invalid",
      value: "keket@-.com",
    });
  });

  test("error required", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<InputEmail id="test" value="" error="" onChange={onChange} />);

    wrapper.simulate("change", { target: { value: "" } });
    expect(onChange).toBeCalledWith({ error: "forms.this_field_must_be_filled", value: "" });
  });
});
