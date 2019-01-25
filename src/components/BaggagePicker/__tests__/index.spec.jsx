// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BaggagePicker from "../index";
import { baggageData } from "../services/data";
// $FlowFixMe
import airlines from "../../../../stories/fixtures/airlines.json";

const props = {
  passengerCategory: "adult",
  changeBagCombination: (type, index) => {
    console.log(type, index); // eslint-disable-line
  },
  baggage: baggageData,
  airlines,
  context: "booking",
  pickerType: "handBag",
  shouldShowRecheckNote: false,
  passengerBaggage: {
    handBag: 1,
    holdBag: 6,
  },
};

describe("#BaggagePicker", () => {
  test("getOptionItems return items ", () => {
    const wrapper = shallow(<BaggagePicker {...props} />);
    const instance = wrapper.instance();

    const optionItems = instance.getOptionItems(baggageData.definitions.handBag, [0, 0, 1]);
    expect(optionItems["0"].amount).toEqual(2);
    expect(optionItems["1"].amount).toEqual(1);
  });

  test("getBaggagePickerOptions return options ", () => {
    const wrapper = shallow(<BaggagePicker {...props} />);
    const instance = wrapper.instance();
    const handBagOptions = instance.getOptions();
    expect(handBagOptions[0].pickerType).toEqual("handBag");
  });
});
