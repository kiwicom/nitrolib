// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import BaggageOption from "../index";
import { Provider } from "../../../services/context";

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
    merchant: null,
    service: 0,
    serviceFlat: 0,
  },
  isChecked: false,
  onClick: jest.fn(),
};

const context = {
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
};

describe("#BaggageOption", () => {
  test("render priority boarding", () => {
    const wrapper = mount(
      <Provider value={context}>
        <BaggageOption {...props} />
      </Provider>,
    );
    expect(wrapper.find("PriorityBoardingInfo").exists()).toBe(true);
  });

  test("render alert", () => {
    const wrapper = mount(
      <Provider value={context}>
        <BaggageOption {...props} isChecked />
      </Provider>,
    );

    expect(wrapper.find("Alert").exists()).toEqual(true);
  });

  test("render checked Radio", () => {
    const wrapper = mount(
      <Provider value={context}>
        <BaggageOption {...props} isChecked />
      </Provider>,
    );
    expect(wrapper.find("Radio").exists()).toBe(true);
    const radioProps = wrapper.find("Radio").props() || {};
    expect(radioProps.checked).toBe(true);
  });

  test("render no-personal item info", () => {
    const wrapper = mount(
      <Provider value={context}>
        <BaggageOption {...props} items={{ "1": handBagExample }} />
      </Provider>,
    );
    expect(wrapper.find("BaggagePersonalItemNone").exists()).toBe(true);
  });
});
