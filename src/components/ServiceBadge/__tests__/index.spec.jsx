// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import ServiceBadge from "..";

describe("#ServiceBadge", () => {
  test("plus", () => {
    const wrapper = shallow(<ServiceBadge />);

    expect(wrapper.find("Text").prop("t")).toBe("booking.service_packages.plus");
  });

  test("premium", () => {
    const wrapper = shallow(<ServiceBadge premium />);

    expect(wrapper.find("Text").prop("t")).toBe("booking.service_packages.premium");
  });
});
