// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Segment from "..";

const props = {
  segment: {
    id: "segment2",
    source: {
      station: {
        id: "station2",
        name: "Prague",
        code: "PRG",
        city: {
          id: "PRG",
          name: "Prague",
          code: "PRG",
          slug: "prague",
        },
        country: {
          id: "CZ",
          name: "Czech Republic",
          slug: "czechia",
          code: "CZ",
        },
        type: "AIRPORT",
      },
      time: new Date(),
    },
    destination: {
      station: {
        id: "station2",
        name: "London",
        code: "LTN",
        city: {
          id: "LTN",
          code: "LTN",
          name: "London",
          slug: "london",
        },
        country: {
          id: "UK",
          name: "United Kingdom",
          code: "UK",
          slug: "united-kingdom",
        },
        type: "AIRPORT",
      },
      time: new Date(),
    },
    type: "FLIGHT",
    code: "1",
    duration: 125,
    layover: {
      duration: 30,
      guarantee: "KIWI_COM",
      isStationChange: false,
      isBaggageRecheck: false,
    },
    carrier: "W6",
    operatingCarrier: "W6",
    seatInfo: {
      pitch: {
        value: "30",
        unit: "CM",
      },
      width: {
        value: "80",
        unit: "CM",
      },
      recline: {
        value: "180",
        unit: "DEGREE",
      },
      hasPower: true,
      hasAudioVideo: false,
      hasWifi: true,
    },
  },
  highlight: false,
  last: false,
  returnTrip: false,
  carriers: [{ id: "kek", name: "Pobeda", code: "DP" }],
};

describe("#Segment", () => {
  it("should show layover, if not last segment", () => {
    // $FlowExpected: TODO
    const wrapper = mount(<Segment {...props} />);
    expect(wrapper.find("TripLayover").exists()).toBe(true);
  });

  it("shoud hide layover", () => {
    // $FlowExpected: TODO
    const wrapper = mount(<Segment {...props} last />);
    expect(wrapper.find("TripLayover").exists()).toBe(false);
  });

  it("should have tooltip if station changed", () => {
    // $FlowExpected: TODO
    const wrapper = mount(<Segment {...props} highlight />);
    expect(wrapper.find("TranslateTooltip").exists()).toBe(true);
  });
});
