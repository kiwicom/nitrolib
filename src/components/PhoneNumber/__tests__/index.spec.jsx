// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import PhoneNumber from "..";

describe("#PhoneNumber", () => {
  it("should format the phone number correctly", () => {
    const wrapper = shallow(<PhoneNumber tel="+34642424242" />);
    expect(wrapper.text()).toBe("+34 642 42 42 42");
  });
});
