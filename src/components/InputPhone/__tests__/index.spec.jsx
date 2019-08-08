// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import InputPhone from "..";

describe("#InputPhone", () => {
  test("render", () => {
    const wrapper = shallow(<InputPhone id="test" value="" error="" onChange={jest.fn()} />);

    expect(wrapper.find("InputField").exists()).toBe(true);
  });

  test("error wrong format", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<InputPhone id="test" value="" error="" onChange={onChange} />);
    wrapper.simulate("change", { target: { value: "+420228880" } });

    expect(onChange).toBeCalledWith({ error: "forms.errors.invalid_phone", value: "+420228880" });
  });

  test("error not supported", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<InputPhone id="test" value="" error="" onChange={onChange} />);
    wrapper.simulate("change", { target: { value: "231" } });

    expect(onChange).toBeCalledWith({ error: "forms.errors.not_supported", value: "231" });
  });

  test("error required", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<InputPhone id="test" value="" error="" onChange={onChange} />);
    wrapper.simulate("change", { target: { value: "" } });

    expect(onChange).toBeCalledWith({ error: "forms.this_field_must_be_filled", value: "" });
  });
});
