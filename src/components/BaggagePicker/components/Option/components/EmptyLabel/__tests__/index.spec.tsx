import * as React from "react";
import { mount } from "enzyme";
import ThemeProvider from "@kiwicom/orbit-components/lib/ThemeProvider";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

import EmptyLabel from "..";

const props = {
  isCurrentCombination: false,
  pickerType: "handBag",
};

describe("#EmptyLabel", () => {
  test("renders", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <EmptyLabel {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("EmptyLabel").exists()).toBe(true);
  });
  test("renders with current", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <EmptyLabel {...props} isCurrentCombination />
      </ThemeProvider>,
    );
    const TextArr = wrapper.find("Text");
    expect(TextArr.last().text()).toBe("baggage_modal.select.current");
  });
});
