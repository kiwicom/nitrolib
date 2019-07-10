// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import InputEmail from "..";

const Email = "kek@kiwi.com";

describe("#InputEmail", () => {
  test("render", () => {
    const wrapper = shallow(<InputEmail id="test" value={Email} onChange={jest.fn()} />);

    expect(wrapper.find("InputField").exists()).toBe(true);
  });

  test("error wrong format", () => {
    const wrapper = shallow(<InputEmail id="test" value="kek@-.com" onChange={jest.fn()} />);

    expect(wrapper.find("InputField").prop("error")).toBe("forms.wrong_format_email");
  });

  test("error required", () => {
    const wrapper = shallow(<InputEmail id="test" value="" onChange={jest.fn()} />);

    expect(wrapper.find("InputField").prop("error")).toBe("forms.this_field_must_be_filled");
  });
});
