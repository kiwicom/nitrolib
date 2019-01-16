// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BaggagePicker from "../index";
import exampleData from "../baggagePickerData";

const props = {
  options: exampleData,
  pickerType: "handBag",
  onChange: () => {},
  selectedIndex: 5,
  shouldShowRecheckNote: true,
  context: "booking",
};

describe("#BaggagePicker", () => {
  test("render", () => {
    const wrapper = shallow(<BaggagePicker {...props} />);
    expect(wrapper.find("Option").exists()).toBe(true);
  });

  test("hide options and render show more button", () => {
    const wrapper = shallow(<BaggagePicker {...props} />);
    const instance = wrapper.instance();
    expect(instance.state.hiddenItems).toBe(3);
    expect(wrapper.find("Button").exists()).toBe(true);
  });

  test("show all options and don't render show more button", () => {
    const wrapper = shallow(<BaggagePicker {...props} options={exampleData.slice(0, 4)} />);
    const instance = wrapper.instance();
    expect(instance.state.hiddenItems).toBe(0);
    expect(wrapper.find("Button").exists()).toBe(false);
  });

  test("show all options after clicking on Button", () => {
    const wrapper = shallow(<BaggagePicker {...props} />);
    const instance = wrapper.instance();

    expect(instance.state.hiddenItems).toBe(3);
    wrapper.find("Button").simulate("click");
    expect(instance.state.hiddenItems).toBe(0);
  });

  test("getTitle return title with proper translation key", () => {
    const wrapper = shallow(<BaggagePicker {...props} />);
    const instance = wrapper.instance();

    const cabinBaggageTitle = instance.getTitle("handBag");
    expect(cabinBaggageTitle.props.t).toEqual("common.baggage.cabin_baggage");

    const checkedBaggageTitle = instance.getTitle("holdBag");
    expect(checkedBaggageTitle.props.t).toEqual("common.baggage.checked_baggage");
  });

  test("getTooltip return tooltip with proper translation key", () => {
    const wrapper = shallow(<BaggagePicker {...props} />);
    const instance = wrapper.instance();

    const cabinBaggageTooltip = instance.getTooltip("handBag");
    expect(cabinBaggageTooltip.props.t).toEqual("common.baggage.tooltip.cabin_baggage");

    const checkedBaggageTooltip = instance.getTooltip("holdBag");
    expect(checkedBaggageTooltip.props.t).toEqual("common.baggage.tooltip.checked_baggage");
  });
});
