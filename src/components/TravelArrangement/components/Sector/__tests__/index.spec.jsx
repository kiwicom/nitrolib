// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Sector from "..";

describe("#Sector", () => {
  test("render", () => {
    const data = {
      from: "Prague, Czech Republic",
      to: "Denpasar, Bali",
      stops: "0",
      note: "Transfer to hotel NOT included",
    };
    const wrapper = shallow(<Sector data={data} direction="landing" />);

    expect(wrapper).toMatchSnapshot();
  });
});
