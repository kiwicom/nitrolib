// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { Provider } from "../context";

const currencies = {
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
  gbp: {
    id: "gbp",
    name: "British Pound Sterling",
    format: "£__price__",
    uncertainFormat: false,
    round: "2",
    enabledOnAffilId: ["UK"],
    fallback: "",
    rate: 1.14355,
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
};

const countries = {
  gb: {
    id: "gb",
    continent: "eu",
    currency: "gbp",
    EN: "United Kingdom",
  },
  cz: {
    id: "cz",
    continent: "eu",
    currency: "czk",
    EN: "Czech Republic",
  },
};

describe("#currency/context", () => {
  test("render", () => {
    const wrapper = shallow(
      <Provider
        countries={countries}
        whitelist={["eur", "czk", "gbp"]}
        affiliate=""
        ip="1.2.3.4"
        initialCurrency="eur"
        langCurrency="eur"
        onChange={jest.fn()}
        getCurrencies={jest.fn()}
        getGeoCountry={jest.fn()}
      >
        Content
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("mount", async () => {
    const currenciesPromise = Promise.resolve(currencies);
    const countryPromise = Promise.resolve("sk");

    const getCurrencies = jest.fn().mockImplementation(() => currenciesPromise);
    const getGeoCountry = jest.fn().mockImplementation(() => countryPromise);
    const wrapper = shallow(
      <Provider
        countries={countries}
        whitelist={["eur", "czk", "gbp"]}
        affiliate=""
        ip="1.2.3.4"
        initialCurrency="eur"
        langCurrency="eur"
        onChange={jest.fn()}
        getCurrencies={getCurrencies}
        getGeoCountry={getGeoCountry}
      >
        Content
      </Provider>,
    );

    expect(getCurrencies).toBeCalled();
    expect(getGeoCountry).toBeCalledWith("1.2.3.4");

    await Promise.all([currenciesPromise, countryPromise]);

    expect(wrapper.state("all")).toBe(currencies);
    expect(wrapper.state("country")).toBe("sk");
  });

  test("update", async () => {
    const currenciesPromise = Promise.resolve(currencies);
    const countryPromise = Promise.resolve("sk");

    const getCurrencies = jest.fn().mockImplementation(() => currenciesPromise);
    const getGeoCountry = jest.fn().mockImplementation(() => countryPromise);
    const wrapper = shallow(
      <Provider
        countries={countries}
        whitelist={["eur", "czk", "gbp"]}
        affiliate=""
        ip="1.2.3.4"
        initialCurrency="eur"
        langCurrency="eur"
        onChange={jest.fn()}
        getCurrencies={getCurrencies}
        getGeoCountry={getGeoCountry}
      >
        Content
      </Provider>,
    );

    wrapper.setState({ all: {}, country: "" });

    await Promise.all([currenciesPromise, countryPromise]);

    expect(wrapper.state("all")).toBe(currencies);
    expect(wrapper.state("country")).toBe("sk");
  });

  test("set currency", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Provider
        countries={countries}
        whitelist={["eur", "czk", "gbp"]}
        affiliate=""
        ip="1.2.3.4"
        initialCurrency="eur"
        langCurrency="eur"
        onChange={onChange}
        getCurrencies={jest.fn()}
        getGeoCountry={jest.fn()}
      >
        Content
      </Provider>,
    );

    wrapper.setState({ available: currencies });
    wrapper.instance().setCurrency("gbp");

    expect(wrapper.state("currency")).toBe(currencies.gbp);
    expect(onChange).toBeCalledWith("gbp");
  });
});
