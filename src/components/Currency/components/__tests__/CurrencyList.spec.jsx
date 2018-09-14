// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CurrencyList from "../CurrencyList";

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

const active = currencies.eur;

const list = [currencies.gbp, currencies.eur, currencies.czk, currencies.usd];

describe("#Currency/CustomPicker/CurrencyList", () => {
  test("render", () => {
    const wrapper = shallow(<CurrencyList active={active} list={list} onSetCurrency={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("CurrencyList__ItemText[active=true]").shallow()).toMatchSnapshot();
    expect(
      wrapper
        .find("CurrencyList__ItemText[active=false]")
        .first()
        .shallow(),
    ).toMatchSnapshot();
  });

  test("handle click", () => {
    const onSetCurrency = jest.fn();
    const wrapper = shallow(
      <CurrencyList active={active} list={list} onSetCurrency={onSetCurrency} />,
    );

    wrapper
      .find("CurrencyList__Item")
      .first()
      .find("CurrencyList__ItemText")
      .simulate("click");

    expect(onSetCurrency).toBeCalledWith("gbp");
  });
});
