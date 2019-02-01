// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Currency from "..";

import { Provider } from "../../../services/currency/context";

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

const recommended = [currencies.eur, currencies.czk, currencies.gbp];

describe("#Currency", () => {
  test("render loading", () => {
    // Default currency
    const wrapper = mount(<Currency />);

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  test("render native", () => {
    const wrapper = mount(
      <Provider
        value={{
          currency: current,
          available: currencies,
          recommended,
          onChange: jest.fn(),
        }}
      >
        <Currency native />
      </Provider>,
    );

    expect(wrapper.find("NativePicker").exists()).toBe(true);
  });

  test("render custom", () => {
    const wrapper = mount(
      <Provider
        value={{
          currency: current,
          available: currencies,
          recommended,
          onChange: jest.fn(),
        }}
      >
        <Currency />
      </Provider>,
    );

    expect(wrapper.find("CustomPicker").exists()).toBe(true);
  });

  test("on change native recommended", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Provider
        value={{
          currency: current,
          available: currencies,
          recommended,
          onChange,
        }}
      >
        <Currency native />
      </Provider>,
    );

    wrapper
      .find("NativePicker")
      .find("select")
      .find("optgroup")
      .at(1) // current, recommended, all
      .find("option")
      .filter("[value='gbp']")
      .simulate("change", { target: { value: "gbp" } });

    expect(onChange).toBeCalledWith("gbp");
  });

  test("on change native", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Provider
        value={{
          currency: current,
          available: currencies,
          recommended,
          onChange,
        }}
      >
        <Currency native />
      </Provider>,
    );

    wrapper
      .find("NativePicker")
      .find("select")
      .find("optgroup")
      .at(2) // current, recommended, all
      .find("option")
      .filter("[value='gbp']")
      .simulate("change", { target: { value: "gbp" } });

    expect(onChange).toBeCalledWith("gbp");
  });

  test("on change first", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Provider
        value={{
          currency: current,
          available: currencies,
          recommended,
          onChange,
        }}
      >
        <Currency />
      </Provider>,
    );

    // Open it up
    wrapper
      .find("[data-test='Currency-Open']")
      .first()
      .simulate("click");

    wrapper
      .find("[data-test='Currency']")
      .find("[data-test='Currency-Item-gbp']")
      .first()
      .find("button")
      .simulate("click");

    expect(onChange).toBeCalledWith("gbp");
  });

  test("on change custom recommended", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Provider
        value={{
          currency: current,
          available: currencies,
          recommended,
          onChange,
        }}
      >
        <Currency />
      </Provider>,
    );

    // Open it up
    wrapper
      .find("[data-test='Currency-Open']")
      .first()
      .simulate("click");

    wrapper
      .find("[data-test='Currency']")
      .find("Menu")
      .find("Menu__Recommended")
      .find("List")
      .find("List__Item")
      .filter("[data-test='Currency-Item-gbp']")
      .find("button")
      .simulate("click");

    expect(onChange).toBeCalledWith("gbp");
  });

  test("on change custom", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Provider
        value={{
          currency: current,
          available: currencies,
          recommended,
          onChange,
        }}
      >
        <Currency />
      </Provider>,
    );

    // Open it up
    wrapper
      .find("[data-test='Currency-Open']")
      .first()
      .simulate("click");

    wrapper
      .find("[data-test='Currency']")
      .find("Menu")
      .find("List")
      .at(1)
      .find("List__Item")
      .filter("[data-test='Currency-Item-gbp']")
      .find("button")
      .simulate("click");

    expect(onChange).toBeCalledWith("gbp");
  });
});
