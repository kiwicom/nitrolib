import * as React from "react";
import { shallow } from "enzyme";

import TextNode from "..";

describe("#TextNode", () => {
  test("string", () => {
    const wrapper = shallow(<TextNode t="lol __x__ kek bur" values={{ x: <span>lmao</span> }} />);

    expect(wrapper).toMatchSnapshot();
  });
});
