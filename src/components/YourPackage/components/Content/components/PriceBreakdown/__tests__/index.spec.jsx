// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import PriceBreakdown from "..";

import { themeDefault } from "../../../../../../../records/Theme";

const props = {
  priceBreakdown: {
    packagePrice: {
      amount: 1200.0,
      currency: "€",
    },
    taxes: {
      amount: 200,
      currency: "€",
    },
    fees: {
      amount: 300,
      currency: "€",
    },
    totalPrice: {
      amount: 1700.0,
      currency: "€",
    },
  },
  isCalculatingPrice: false,
};

describe("#HotelInfo", () => {
  test("render", () => {
    const wrapper = mount(<PriceBreakdown {...props} />);

    expect(wrapper.find("PriceBreakdown__Item")).toHaveStyleRule(
      "margin-bottom",
      themeDefault.orbit.spaceXXSmall,
    );

    wrapper.setProps({ isCalculatingPrice: true });
    expect(wrapper.find("PriceBreakdown__LoaderWrapper")).toHaveStyleRule(
      "margin-bottom",
      themeDefault.orbit.spaceMedium,
    );

    expect(wrapper.find("PriceBreakdown__IconWrapper")).toHaveStyleRule(
      "margin-right",
      themeDefault.orbit.spaceSmall,
    );
  });
});
