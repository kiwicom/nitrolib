// @flow
import * as React from "react";
import { shallow } from "enzyme";

import TravelInfo from "..";

describe("#TravelInfo", () => {
  test("render", () => {
    const props = {
      travelArrangement: {
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
      },
      travelDates: {
        from: "Fri 20 Nov",
        to: "Sun 4 Dec",
      },
      passengers: {
        adults: 2,
        children: 1,
      },
    };

    const wrapper = shallow(<TravelInfo {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
