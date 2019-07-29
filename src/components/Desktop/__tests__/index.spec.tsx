import * as React from "react";
import { shallow } from "enzyme";

import Desktop from "..";

describe("#Desktop", () => {
  test("render", () => {
    const wrapper = shallow(<Desktop>asd</Desktop>);

    expect(wrapper.find("Desktop__Wrapper").exists()).toBe(true);
  });
});
