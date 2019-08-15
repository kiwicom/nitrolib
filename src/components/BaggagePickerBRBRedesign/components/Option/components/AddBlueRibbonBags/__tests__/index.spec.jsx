// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import AddBlueRibbonBags from "..";

const props = {
  blueRibbonBagPrice: {
    amount: 4.99,
    base: 4.99,
    service: 0,
    serviceFlat: 0,
    merchant: 0,
    currency: "EUR",
  },
  isBlueRibbonBagAdded: false,
  addBlueRibbonBag: () => {},
  removeBlueRibbonBag: () => {},
  openBlueribbonBagsSmartFAQ: () => {},
};

describe("#AddBlueRibbonBags", () => {
  test("renders", () => {
    const wrapper = mount(<AddBlueRibbonBags {...props} />);
    expect(wrapper.find("AddBlueRibbonBags").exists()).toBe(true);
  });
  test("renders with add button", () => {
    const wrapper = mount(<AddBlueRibbonBags {...props} />);
    const ButtonArr = wrapper.find("Button");
    expect(ButtonArr.last().text()).toBe("baggage_modal.blue_ribbon_bags.add_bag_protection");
  });
  test("renders with remove button when BlueRibbonBag is already added", () => {
    const wrapper = mount(<AddBlueRibbonBags {...props} isBlueRibbonBagAdded />);
    const TextArr = wrapper.find("TextLink");
    expect(TextArr.last().text()).toBe("baggage_modal.blue_ribbon_bags.remove");
  });
});
