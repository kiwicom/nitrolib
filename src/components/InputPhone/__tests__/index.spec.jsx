// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import InputPhone from "..";

describe("#InputEmail", () => {
  test("render", () => {
    const wrapper = shallow(<InputPhone id="test" value="+420228880669" onChange={jest.fn()} />);

    expect(wrapper.find("InputField").exists()).toBe(true);
  });

  test("error wrong format", () => {
    const wrapper = shallow(<InputPhone id="test" value="+420228880" onChange={jest.fn()} />);

    expect(wrapper.find("InputField").prop("error")).toBe("forms.errors.invalid_phone");
  });

  test("error not supported", () => {
    const wrapper = shallow(<InputPhone id="test" value="321" onChange={jest.fn()} />);

    expect(wrapper.find("InputField").prop("error")).toBe("forms.errors.not_supported");
  });

  test("error required", () => {
    const wrapper = shallow(<InputPhone id="test" value="" onChange={jest.fn()} />);

    expect(wrapper.find("InputField").prop("error")).toBe("forms.this_field_must_be_filled");
  });
});
