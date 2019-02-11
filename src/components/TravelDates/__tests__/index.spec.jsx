// @flow
import * as React from "react";
import { shallow } from "enzyme";

import TravelDates from "..";

describe("#TravelDates", () => {
  test("render", () => {
    const data = {
      from: "Fri 20 Nov",
      to: "Sun 4 Dec",
    };
    const wrapper = shallow(<TravelDates data={data} />);

    expect(wrapper).toMatchSnapshot();
  });
});
