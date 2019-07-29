import * as React from "react";
import { mount } from "enzyme";

import Badge from "..";

const props = {
  orderStatus: "unpaid",
  price: 21,
};

describe("#Badge", () => {
  test("renders status unpaid", () => {
    const wrapper = mount(<Badge {...props} />);
    expect(wrapper.find("[data-test='CustomerBaggageTile-Badge-unpaid']").exists()).toBe(true);
  });
  test("renders status processing", () => {
    const wrapper = mount(<Badge price={null} orderStatus="processing" />);
    expect(wrapper.find("[data-test='CustomerBaggageTile-Badge-processing']").exists()).toBe(true);
  });
  test("renders status not available", () => {
    const wrapper = mount(<Badge price={null} orderStatus="notAvailable" />);
    expect(wrapper.find("[data-test='CustomerBaggageTile-Badge-notAvailable']").exists()).toBe(
      true,
    );
  });
});
