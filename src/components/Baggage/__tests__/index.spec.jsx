// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Baggage from "../index";
import baggageData from "../baggageData";

const props = {
  passengerIndex: 0,
  passengerCategory: "adult",
  changeBagCombination: (type, index) => {
    console.log(type, index); // eslint-disable-line
  },
  baggage: baggageData,
  hasDubaiAirport: true,
  selfTransferEnabled: true,
  selfTransferTooltip: "SelfTransferTooltip",
  disabledBagsInMmb: true,
  airlines: [],
  context: "booking",
  pickerType: "handBag",
  passengerBaggage: {
    handBag: 1,
    holdBag: 6,
  },
  shouldShowRecheckNote: false,
};

describe("#Baggage", () => {
  test("getOptionItems return items ", () => {
    const wrapper = shallow(<Baggage {...props} />);
    const instance = wrapper.instance();

    const optionItems = instance.getOptionItems(baggageData.definitions.handBag, [0, 0, 1]);
    expect(optionItems["0"].amount).toEqual(2);
    expect(optionItems["1"].amount).toEqual(1);
  });

  test("getBaggagePickerOptions return options ", () => {
    const wrapper = shallow(<Baggage {...props} />);
    const instance = wrapper.instance();
    const handBagOptions = instance.getBaggagePickerOptions("handBag");
    const holdBagOptions = instance.getBaggagePickerOptions("holdBag");

    expect(handBagOptions[0].bagType).toEqual("handBag");
    expect(holdBagOptions[0].bagType).toEqual("holdBag");
  });

  test("getTitle return title with proper translation key", () => {
    const wrapper = shallow(<Baggage {...props} />);
    const instance = wrapper.instance();

    const cabinBaggageTitle = instance.getTitle("handBag");
    expect(cabinBaggageTitle.props.t).toEqual("common.baggage.cabin_baggage");

    const checkedBaggageTitle = instance.getTitle("holdBag");
    expect(checkedBaggageTitle.props.t).toEqual("common.baggage.checked_baggage");
  });

  test("getTooltip return tooltip with proper translation key", () => {
    const wrapper = shallow(<Baggage {...props} />);
    const instance = wrapper.instance();

    const cabinBaggageTooltip = instance.getTooltip("handBag");
    expect(cabinBaggageTooltip.props.t).toEqual("common.baggage.tooltip.cabin_baggage");

    const checkedBaggageTooltip = instance.getTooltip("holdBag");
    expect(checkedBaggageTooltip.props.t).toEqual("common.baggage.tooltip.checked_baggage");
  });
});
