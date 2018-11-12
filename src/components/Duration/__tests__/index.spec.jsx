// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Duration from "..";

describe("#Duration", () => {
  test("format default", () => {
    const dateFrom = new Date(Date.UTC(2017, 9, 28));
    const dateTo = new Date(Date.UTC(2017, 9, 30));

    const wrapper = shallow(<Duration timeFrom={dateFrom} timeTo={dateTo} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("format custom", () => {
    const dateFrom = new Date(Date.UTC(2017, 9, 28));
    const dateTo = new Date(Date.UTC(2017, 9, 30));

    const wrapper = shallow(<Duration timeFrom={dateFrom} timeTo={dateTo} format="HH:mm:ss" />);

    expect(wrapper).toMatchSnapshot();
  });
});
