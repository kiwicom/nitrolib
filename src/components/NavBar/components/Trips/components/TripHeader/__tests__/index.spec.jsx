// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { TripHeaderUnwrapped as TripHeader } from "..";

const trips: any = {
  edges: [
    {
      node: {
        isPastBooking: false,
      },
    },
  ],
};

const wrapper = mount(<TripHeader list={trips} />);

describe("#TripHeader", () => {
  test("render", () => {
    const wrapper = shallow(<TripHeader list={trips} />);

  it("should has Translate for past trips", () => {
    expect(
      wrapper
        .find("Translate")
        .at(1)
        .exists(),
    ).toBe(true);
  });
});
