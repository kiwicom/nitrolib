// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";
import GpsIcon from "@kiwicom/orbit-components/lib/icons/Gps";

import LocationPicker from "..";

describe("#LocationPicker", () => {
  const ObjectLocation = {
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

  test("render", () => {
    const wrapper = shallow(
      <LocationPicker value={ObjectLocation} onChange={jest.fn()} label="From" />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render active", () => {
    const wrapper = shallow(<LocationPicker value={null} onChange={jest.fn()} label="From" />);

    wrapper.setState({ active: true });

    expect(wrapper).toMatchSnapshot();
  });

  test("check input value", () => {
    const wrapper = mount(<LocationPicker value={null} onChange={jest.fn()} label="From" />);
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "New Vegas" } });
    expect(input.instance().value).toBe("New Vegas");
  });

  test("With Icon", () => {
    const wrapper = shallow(
      <LocationPicker icon={<GpsIcon />} value={null} onChange={jest.fn()} label="From" />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
