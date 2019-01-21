// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";

import LocationPicker from "..";

const loc = {
  code: "EN",
  country: {
    code: "US",
    id: "US",
    name: "United States",
    slug: "united-states",
  },
  id: "denver_co_us",
  location: {
    lat: 39.739236,
    lng: -104.990251,
  },
  name: "Denver",
  slug: "denver-colorado-united-states",
  subdivision: {
    code: "CO",
    id: "CO_US",
    name: "Colorado",
    slug: "colorado-united-states",
  },
  type: "city",
};

describe("#LocationPicker", () => {
  test("render", () => {
    const wrapper = shallow(<LocationPicker value={loc} onChange={jest.fn()} label="From" />);

    expect(wrapper.find("QueryRenderer").exists()).toBe(false);
  });

  test("render active and with input", () => {
    const wrapper = shallow(<LocationPicker value={null} onChange={jest.fn()} label="From" />);

    wrapper.setState({ active: true, input: "VIE" });

    expect(wrapper.find("QueryRenderer").exists()).toBe(false);
    expect(wrapper.find("InputField").prop("value")).toBe("VIE");
  });

  test("check input value", () => {
    const wrapper = mount(<LocationPicker value={null} onChange={jest.fn()} label="From" />);

    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "New Vegas" } });

    expect(input.instance().value).toBe("New Vegas");
  });
});
