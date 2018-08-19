// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { CurrencyListUnwrapped as CurrencyList } from "../CurrencyList";

const available = {
  dkk: {
    id: "dkk",
    name: "Danish Krone",
    format: "__price__ kr",
    uncertainFormat: true,
    round: "0",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.13434,
  },
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
  hkd: {
    id: "hkd",
    name: "Hong Kong dollar",
    format: "HK$__price__",
    uncertainFormat: false,
    round: "0",
    enabledOnAffilId: "AFFIL",
    fallback: "gbp",
    rate: 0.109077,
  },
  huf: {
    id: "huf",
    name: "Hungarian Forint",
    format: "__price__ Ft",
    uncertainFormat: false,
    round: "0",
    enabledOnAffilId: "AFFIL",
    fallback: "czk",
    rate: 0.00312772,
  },
};

const active = {
  id: "eur",
  name: "Euro",
  format: "__price__ €",
  uncertainFormat: false,
  round: "2",
  enabledOnAffilId: "",
  fallback: "",
  rate: 1,
};

const list: any = {
  edges: [
    {
      node: {
        code: "eur",
        name: "Euro",
      },
    },
    {
      node: {
        code: "huf",
        name: "Hungarian Forint",
      },
    },
  ],
};

describe("#Currency/CurrencyList", () => {
  test("render", () => {
    const wrapper = shallow(
      <CurrencyList list={list} available={available} active={active} onSetCurrency={jest.fn()} />,
    );

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
      <CurrencyList
        list={list}
        available={available}
        active={active}
        onSetCurrency={onSetCurrency}
      />,
    );

    wrapper
      .find("CurrencyList__Item")
      .first()
      .find("CurrencyList__ItemText")
      .simulate("click");

    expect(onSetCurrency).toBeCalledWith("eur");
  });
});
