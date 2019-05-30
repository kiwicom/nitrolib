// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

import CustomerBaggageTile from "../index";
import { baggageData } from "../../../records/__mocks__/baggageData";

const props = {
  firstName: "Oliver",
  lastName: "Dlouhy",
  gender: "male",
  isProcessing: false,
  current: { handBag: 1, holdBag: 1 },
  selected: { handBag: 3, holdBag: 4 },
  onClick: () => {},
  supportLinkHandler: () => {},
  baggage: baggageData,
};

describe("#CustomerBaggageTile", () => {
  test("renders", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <CustomerBaggageTile {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("[data-test='CustomerBaggageTile-unpaid']").exists()).toBe(true);
  });
});
