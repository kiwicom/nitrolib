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
        onLearnMoreClick={jest.fn()}
        onMoreTripsClick={jest.fn()}
      />,
    );

    expect(wrapper.find("Card").prop("dataTest")).toBe("BookingSavingsBanner");
  });

  test("on click", () => {
    const onLearnMoreClick = jest.fn();
    const onMoreTripsClick = jest.fn();

    const wrapper = shallow(
      <BookingSavingsBanner
        amount={28.76}
        currency="€"
        onLearnMoreClick={onLearnMoreClick}
        onMoreTripsClick={onMoreTripsClick}
      />,
    );

    wrapper.find(`[dataTest="saving-banner-button-learn-more"]`).simulate("click");
    wrapper.find(`[dataTest="saving-banner-button-find-more-trips"]`).simulate("click");

    expect(onLearnMoreClick).toHaveBeenCalledTimes(1);
    expect(onMoreTripsClick).toHaveBeenCalledTimes(1);
  });
});
