// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import InputPhone from "..";

describe("#InputPhone", () => {
  test("render", () => {
    const wrapper = shallow(<InputPhone id="test" value="" error="" onChange={jest.fn()} />);

    expect(wrapper.find("InputField").exists()).toBe(true);
  });
});
