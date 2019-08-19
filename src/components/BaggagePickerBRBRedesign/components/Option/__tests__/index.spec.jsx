// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BaggageOption from "..";

const handBagExample = {
  amount: 1,
  category: "cabinBag",
  conditions: {
    passengerGroups: ["adult"],
  },
  restrictions: {
    dimensionsSum: 156,
    height: 35,
    length: 45,
    weight: 10,
    width: 20,
  },
};

const props = {
  items: {
    "1": {
      amount: 1,
      category: "holdBag",
      conditions: {
        isPriority: ["FR", "W6"],
        passengerGroups: ["adult"],
      },
      restrictions: {
        dimensionsSum: 156,
        height: 52,
        length: 78,
        weight: 25,
        width: 26,
      },
    },
  },
  price: {
    amount: 0,
    currency: "EUR",
    base: 0,
    merchant: 0,
    service: 0,
    serviceFlat: 0,
  },
  isChecked: false,
  onClick: jest.fn(),
  isCurrentCombination: false,
  isPersonalItemPresent: false,
  pickerType: "handBag",
  shouldShowRecheckNote: true,
  airlines: {
    W6: {
      id: "W6",
      lcc: 1,
      name: "Wizzair",
    },
    FR: {
      id: "FR",
      lcc: 1,
      name: "Ryanair",
    },
  },
  prioBoardingLinkHandler: () => {},
  shouldShowAddBlueRibbonBag: true,
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

describe("#BaggageOption", () => {
  test("render priority boarding", () => {
    const wrapper = shallow(<BaggageOption {...props} />);
    expect(wrapper.find("PriorityBoardingInfo").exists()).toBe(true);
  });

  test("render alert", () => {
    const wrapper = shallow(<BaggageOption {...props} isChecked />);

    expect(wrapper.find("Alert").exists()).toEqual(true);
  });

  test("render checked Radio", () => {
    const wrapper = shallow(<BaggageOption {...props} isChecked />);
    expect(wrapper.find("Radio").exists()).toBe(true);
    const radioProps = wrapper.find("Radio").props() || {};
    expect(radioProps.checked).toBe(true);
  });

  test("render no-personal item info", () => {
    const wrapper = shallow(
      <BaggageOption {...props} items={{ "1": handBagExample }} isPersonalItemPresent />,
    );
    expect(wrapper.find("BaggagePersonalItemNone").exists()).toBe(true);
  });

  test("render empty option for handBag", () => {
    const wrapper = shallow(<BaggageOption {...props} items={{}} />);

    expect(
      wrapper
        .find("EmptyLabel")
        .dive()
        .find("Translate")
        .prop("t"),
    ).toEqual("baggage_modal.select.no_cabin_baggage");
  });

  test("render empty option for handBag", () => {
    const wrapper = shallow(<BaggageOption {...props} items={{}} pickerType="holdBag" />);

    expect(
      wrapper
        .find("EmptyLabel")
        .dive()
        .find("Translate")
        .prop("t"),
    ).toEqual("baggage_modal.select.no_checked_baggage");
  });
});
