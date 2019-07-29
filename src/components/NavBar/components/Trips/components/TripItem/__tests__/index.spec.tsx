import * as React from "react";
import { mount } from "enzyme";

import TripItem from "..";

const wrapper = mount(
  <TripItem
    arrivalCity="Prague"
    bid="1"
    passengerCount={2}
    departureTime={new Date(Date.UTC(0, 0, 0, 19, 30))}
    departureCity="New York"
    countOtherCities={0}
    arrivalTime={new Date(Date.UTC(0, 0, 0, 21, 30))}
    onSelect={jest.fn()}
  />,
);

describe("#TripItem", () => {
  it("should contain day components", () => {
    expect(wrapper.find("Day").exists()).toBe(true);
  });

  it("should has translation for passengers", () => {
    expect(wrapper.find("Translate").prop("values")).toEqual({ passengers: 2 });
  });

  it("should contain image", () => {
    expect(wrapper.find("TripItem__Img").exists()).toBe(true);
  });
});
