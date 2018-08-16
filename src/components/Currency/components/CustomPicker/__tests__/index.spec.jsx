// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CustomPicker from "../index";

const currencies = {
  gbp: {
    id: "gbp",
    name: "British Pound Sterling",
    format: "£__price__",
    uncertainFormat: false,
    round: "2",
    enabledOnAffilId: "",
    fallback: "",
    rate: 1.14355,
  },
  eur: {
    id: "eur",
    name: "Euro",
    format: "__price__ €",
    uncertainFormat: false,
    round: "2",
    enabledOnAffilId: "",
    fallback: "",
    rate: 1,
  },
  czk: {
    id: "czk",
    name: "Czech Republic Koruna",
    format: "__price__ Kč",
    uncertainFormat: false,
    round: "0",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.0387945,
  },
  usd: {
    id: "usd",
    name: "US Dollar",
    format: "$ __price__",
    uncertainFormat: true,
    round: "2",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.855903,
  },
};

const current = currencies.eur;

const available = [currencies.gbp, currencies.eur, currencies.czk, currencies.usd];

const recommended = [currencies.eur, currencies.czk, currencies.gbp];

describe("#Currency/CustomPicker", () => {
  test("render", async () => {
    const wrapper = shallow(
      <CustomPicker
        current={current}
        available={available}
        recommended={recommended}
        onChange={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("handle toggle", async () => {
    const wrapper = shallow(
      <CustomPicker
        current={current}
        available={available}
        recommended={recommended}
        onChange={jest.fn()}
      />,
    );

    wrapper.instance().handleToggle();
    expect(wrapper.state("shown")).toBe(true);
    expect(wrapper.find("Menu")).toHaveLength(1);

    wrapper.instance().handleToggle();
    expect(wrapper.state("shown")).toBe(false);
    expect(wrapper.find("Menu")).toHaveLength(0);
  });

  test("handle hide", async () => {
    const wrapper = shallow(
      <CustomPicker
        current={current}
        available={available}
        recommended={recommended}
        onChange={jest.fn()}
      />,
    );

    wrapper.instance().handleToggle();

    wrapper.instance().handleHide();
    expect(wrapper.state("shown")).toBe(false);
  });

  test("handle set currency", async () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <CustomPicker
        current={current}
        available={available}
        recommended={recommended}
        onChange={onChange}
      />,
    );

    wrapper.instance().handleSetCurrency("czk");
    expect(onChange).toBeCalledWith("czk");
  });

  test("closes on set currency", async () => {
    const wrapper = shallow(
      <CustomPicker
        current={current}
        available={available}
        recommended={recommended}
        onChange={jest.fn()}
      />,
    );

    wrapper.instance().handleToggle();

    wrapper.instance().handleSetCurrency("czk");
    expect(wrapper.state("shown")).toBe(false);
  });
});
