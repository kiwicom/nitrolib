// @flow
import * as React from "react";
import { shallow } from "enzyme";

import TravelArrangement from "..";

describe("#TravelArrangement", () => {
  test("render - row", () => {
    const data = {
      takeOff: {
        from: "Prague, Czech Republic",
        to: "Denpasar, Bali",
        stops: "0",
        note: "Transfer to hotel NOT included",
      },
      landing: {
        from: "Denpasar, Bali",
        to: "Prague, Czech Republic",
        stops: "2",
        note: "Transfer to hotel NOT included",
      },
    };
    const wrapper = shallow(<TravelArrangement data={data} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - column", () => {
    const data = {
      takeOff: {
        from: "Prague, Czech Republic",
        to: "Denpasar, Bali",
        stops: "0",
        note: "Transfer to hotel NOT included",
      },
      landing: {
        from: "Denpasar, Bali",
        to: "Prague, Czech Republic",
        stops: "2",
        note: "Transfer to hotel NOT included",
      },
    };
    const wrapper = shallow(<TravelArrangement data={data} columnLayout />);

    expect(wrapper).toMatchSnapshot();
  });
});
