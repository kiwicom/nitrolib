// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BookingSavingsBanner from "..";

describe("#BookingSavingsBanner", () => {
  test("render", () => {
    const wrapper = shallow(
      <BookingSavingsBanner
        amount={28.76}
        currency="€"
        hrefLearnMore="kiwi.com"
        onMoreTripsClick={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("click", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <BookingSavingsBanner
        amount={28.76}
        currency="€"
        hrefLearnMore="kiwi.com"
        onMoreTripsClick={onClick}
      />,
    );

    wrapper.find(`[dataTest="saving-banner-button-find-more-trips"]`).simulate("click");

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
