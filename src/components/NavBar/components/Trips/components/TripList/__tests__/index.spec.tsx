import * as React from "react";
import { mount } from "enzyme";

import { TripListUnwrapped as TripList } from "..";

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

describe("#TripList", () => {
  test("render", () => {
    const wrapper = mount(<TripList list={list} onSelect={jest.fn()} />);

    expect(wrapper.find("TripList").prop("list")).toBe(list);
  });
});
