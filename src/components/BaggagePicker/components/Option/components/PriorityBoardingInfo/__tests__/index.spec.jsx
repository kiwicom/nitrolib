// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

import PriorityBoardingInfo from "..";

const props = {
  airlines: [
    {
      id: "W6",
      lcc: 1,
      name: "Wizzair",
    },
    {
      id: "FR",
      lcc: 1,
      name: "Ryanair",
    },
  ],
};

describe("#PriorityBoardingInfo", () => {
  test("renders", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <PriorityBoardingInfo {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("PriorityBoardingInfo").exists()).toBe(true);
  });
  test("renders proper text", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <PriorityBoardingInfo {...props} />
      </ThemeProvider>,
    );
    const TextArr = wrapper.find("Text");
    expect(TextArr.first().text()).toBe("baggage_modal.priority_boarding baggage_modal.learn_more");
  });
});
