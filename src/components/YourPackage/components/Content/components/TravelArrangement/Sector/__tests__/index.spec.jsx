// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Sector from "..";

const props = {
  data: [
    {
      departure: "Prague, Czech Republic",
      destination: "Denpasar, Bali",
      numberOfStops: 0,
      note: "Transfer to hotel NOT included",
    },
  ],
  direction: "takeOff",
};

describe("#Sector", () => {
  test("render", () => {
    const wrapper = mount(<Sector {...props} />);

    expect(wrapper.find("AirplaneTakeoff").exists()).toBe(true);
    wrapper.setProps({ direction: "landing" });
    expect(wrapper.find("AirplaneLanding").exists()).toBe(true);

    wrapper.setProps({
      ...props,
      data: [
        {
          ...props.data[0],
          numberOfStops: 0,
        },
      ],
    });
    expect(wrapper.find("StopoverArrow").prop("stops")).toBe("0");

    wrapper.setProps({
      ...props,
      data: [
        {
          ...props.data[0],
          numberOfStops: 1,
        },
      ],
    });
    expect(wrapper.find("StopoverArrow").prop("stops")).toBe("1");

    wrapper.setProps({
      ...props,
      data: [
        {
          ...props.data[0],
          numberOfStops: 2,
        },
      ],
    });
    expect(wrapper.find("StopoverArrow").prop("stops")).toBe("2");

    wrapper.setProps({
      ...props,
      data: [
        {
          ...props.data[0],
          numberOfStops: 3,
        },
      ],
    });
    expect(wrapper.find("StopoverArrow").prop("stops")).toBe("3");
    wrapper.setProps({
      ...props,
      data: [
        {
          ...props.data[0],
          numberOfStops: 4,
        },
      ],
    });
    expect(wrapper.find("StopoverArrow").prop("stops")).toBe("3");
  });
});
