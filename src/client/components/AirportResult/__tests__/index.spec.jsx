// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { AirportResultUnwrapped as AirportResult } from "../index";

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
  test("render", () => {
    const wrapper = shallow(<AirportResult item={item} onClick={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render without country", () => {
    const wrapper = shallow(
      <AirportResult item={{ ...item, country: null }} onClick={jest.fn()} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("click", () => {
    const onClick = jest.fn();
    const wrapper = shallow(<AirportResult item={item} onClick={onClick} />);

    wrapper.find("AirportResult__Container").simulate("click");

    expect(onClick).toBeCalledWith("VIE");
  });
});
