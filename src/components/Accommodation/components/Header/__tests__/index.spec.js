// @flow strict

import * as React from "react";
import { mount } from "enzyme";
import AccommodationIcon from "@kiwicom/orbit-components/lib/icons/Accommodation";

import Header from "..";

describe("#Header", () => {
  test("render", () => {
    const wrapper = mount(
      <Header icon={<AccommodationIcon />} t="holidays.accommodation.title" />
    );
    expect(wrapper.contains("holidays.accommodation.title")).toBe(true);
  });
});
