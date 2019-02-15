// @flow
import * as React from "react";
import { mount } from "enzyme";

import TravelInfo from "..";

import { themeDefault } from "../../../records/Theme";

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

    const wrapper = mount(<TravelInfo {...props} />);

    wrapper.find("TravelInfo__Separator").forEach(node => {
      expect(node).toHaveStyleRule("margin-bottom", themeDefault.orbit.spaceLarge);
      expect(node).toHaveStyleRule("border-bottom-width", themeDefault.orbit.heightSeparator);
      expect(node).toHaveStyleRule("border-bottom-color", themeDefault.orbit.backgroundSeparator);
    });

    expect(wrapper.find("TravelInfo__TravelDatesWrapper")).toHaveStyleRule(
      "margin-bottom",
      themeDefault.orbit.spaceLarge,
    );
  });
});
