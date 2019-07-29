import * as React from "react";
import { shallow, mount } from "enzyme";

import { themeDefault } from "../../../records/Theme";

import { AirportResultUnwrapped as AirportResult } from "..";

const item: any = {
  locationId: "VIE",
  name: "Vienna airport",
  type: "airport",
  city: {
    name: "Vienna",
  },
  country: {
    locationId: "at",
  },
};

describe("#AirportResult", () => {
  test("render default", () => {
    const wrapper = mount(<AirportResult item={item} onClick={jest.fn()} />);

    expect(wrapper.find("AirportResult__Container")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteWhite,
    );
  });

  test("render selected", () => {
    const wrapper = mount(<AirportResult item={item} selected onClick={jest.fn()} />);

    expect(wrapper.find("AirportResult__Container")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteCloudNormal,
    );
  });

  test("render country", () => {
    const wrapper = shallow(<AirportResult item={item} onClick={jest.fn()} />);

    expect(wrapper.find("CountryFlag").prop("code")).toBe("at");
  });

  test("render without country", () => {
    const wrapper = shallow(
      <AirportResult item={{ ...item, country: null }} onClick={jest.fn()} />,
    );

    expect(wrapper.find("CountryFlag").prop("code")).toBe("anywhere");
  });

  test("click", () => {
    const onClick = jest.fn();
    const wrapper = shallow(<AirportResult item={item} onClick={onClick} />);

    wrapper.find("AirportResult__Container").simulate("click");

    expect(onClick).toBeCalledWith("VIE");
  });

  test("click no location", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <AirportResult item={{ ...item, locationId: null }} onClick={onClick} />,
    );

    wrapper.find("AirportResult__Container").simulate("click");

    expect(onClick).not.toBeCalled();
  });
});
