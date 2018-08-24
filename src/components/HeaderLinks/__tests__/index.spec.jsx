// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import HeaderLinks from "..";

describe("#Currency", () => {
  test("render", () => {
    const wrapper = shallow(
      <HeaderLinks
        linkFlights="https://www.kiwi.com/en/?headerLink=linkFlights"
        linkRooms="https://www.kiwi.com/en/?headerLink=linkRooms"
        linkCars="https://www.kiwi.com/en/?headerLink=linkCars"
        linkHolidays="https://www.kiwi.com/en/?headerLink=linkHolidays"
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
