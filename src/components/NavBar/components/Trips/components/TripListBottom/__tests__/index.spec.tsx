import * as React from "react";
import { mount } from "enzyme";

import { TripListBottomUnwrapped as TripListBottom } from "..";

const list: any = {
  edges: [
    {
      node: {
        __id: "id",
        __typename: "typename",
        destinationImageUrl: "url",
      },
    },
  ],
};

describe("#TripListBottom", () => {
  test("render", () => {
    const wrapper = mount(<TripListBottom list={list} />);

    expect(wrapper.find("TripListBottom").exists()).toBe(true);
  });
});
