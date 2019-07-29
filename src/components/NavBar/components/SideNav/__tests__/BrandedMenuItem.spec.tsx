import * as React from "react";
import { shallow } from "enzyme";

import BrandedMenuItem from "../BrandedMenuItem";

describe("#SideNav MenuItem", () => {
  test("render", () => {
    const wrapper = shallow(<BrandedMenuItem link="lol" Icon={() => "Icon"} title="kek" />);

    expect(wrapper.find("MenuItem").exists()).toBe(true);
  });
});
