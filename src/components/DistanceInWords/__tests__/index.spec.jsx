// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import DistanceInWords from "..";

describe("#DistanceInWords", () => {
  test("#formatDistance", () => {
    const wrapper = mount(
      <DistanceInWords from={new Date(2015, 0, 1)} to={new Date(2016, 0, 1)} />,
    );
    expect(wrapper).not.toBeUndefined();
    // TODO separate date fns locale promise and test
  });
});
