// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import { Provider } from "../../../services/currency/context";

import Price from "..";

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

const recommended = [currencies.eur, currencies.czk, currencies.gbp];

describe("#Price", () => {
  test("test price change", () => {
    const wrapper = mount(
      <Provider
        value={{
          currency: currencies.eur,
          recommended,
          available: currencies,
          onChange: jest.fn(),
        }}
      >
        <Price value={1234} />
      </Provider>,
    );

    expect(wrapper.contains("1234 €")).toBe(true);
  });
});
