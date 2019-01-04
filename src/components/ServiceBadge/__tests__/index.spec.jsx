// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import ServiceBadge from "..";

describe("#ServiceBadge", () => {
  test("render", () => {
    const wrapper = shallow(<ServiceBadge />);

    expect(wrapper).toMatchSnapshot();
  });

  test("translation plus", () => {
    const wrapperPlus = shallow(<ServiceBadge />);
    expect(wrapperPlus.find("Text").prop("t")).toBe("booking.service_packages.plus");
  });

  test("translation premium", () => {
    const wrapperPlus = shallow(<ServiceBadge premium />);
    expect(wrapperPlus.find("Text").prop("t")).toBe("booking.service_packages.premium");
  });
});
