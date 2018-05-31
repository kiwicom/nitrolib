// @flow strict
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";

import fetchGeoData from "../services/CurrencyGeo";
import fetchRatesData from "../services/CurrencyRates";
import getAvailableCurrencies from "../services/getAvailableCurrencies";
import getRequestCurrency from "../services/getRequestCurrency";
import resolveCurrency from "../services/resolveCurrency";
import resolveRates from "../services/resolveRates";
import * as store from "../services/store";
import { Provider } from "../context";

jest.mock("../services/CurrencyGeo");
jest.mock("../services/CurrencyRates");
jest.mock("../services/getAvailableCurrencies");
jest.mock("../services/getRequestCurrency");
jest.mock("../services/resolveCurrency");
jest.mock("../services/resolveRates");
jest.mock("../services/store");

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

describe("#Currency Provider", () => {
  beforeEach(() => {
    // $FlowIssue
    fetchGeoData.mockReturnValue(Promise.resolve(null));
    // $FlowIssue
    fetchRatesData.mockReturnValue(
      Promise.resolve({
        currencies: {
          edges: [],
        },
      }),
    );
    // $FlowIssue
    getAvailableCurrencies.mockReturnValue(currencies);
    // $FlowIssue
    getRequestCurrency.mockReturnValue(null);
    // $FlowIssue
    resolveCurrency.mockReturnValue(currencies.eur);
    // $FlowIssue
    resolveRates.mockImplementation((data, available) => available);
  });

  afterEach(() => {
    // $FlowIssue
    fetchGeoData.mockReset();
    // $FlowIssue
    fetchRatesData.mockReset();
    // $FlowIssue
    getAvailableCurrencies.mockReset();
    // $FlowIssue
    getRequestCurrency.mockReset();
    // $FlowIssue
    resolveCurrency.mockReset();
    // $FlowIssue
    resolveRates.mockReset();
    // $FlowIssue
    store.getValue.mockReset();
    // $FlowIssue
    store.saveValue.mockReset();
  });

  test("render with router", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={[{ pathname: "/", key: "testKey" }]}>
        <Provider all={currencies} countries={countries} fromLanguage="">
          Content
        </Provider>
      </MemoryRouter>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render", () => {
    const wrapper = shallow(
      // $FlowIssue
      <Provider.WrappedComponent
        all={currencies}
        countries={countries}
        fromLanguage=""
        location={{ search: "" }}
      >
        Content
      </Provider.WrappedComponent>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("available", () => {
    const mockAvailable = {
      huf: {
        id: "huf",
        name: "Hungarian Forint",
        format: "__price__ Ft",
        uncertainFormat: false,
        round: "0",
        enabledOnAffilId: "",
        fallback: "",
        rate: 0.00312772,
      },
    };

    // $FlowIssue
    getAvailableCurrencies.mockReturnValue(mockAvailable);

    const wrapper = shallow(
      // $FlowIssue
      <Provider.WrappedComponent
        all={currencies}
        countries={countries}
        fromLanguage=""
        location={{ search: "affilid=TEST_AFFIL" }}
      >
        Content
      </Provider.WrappedComponent>,
    );

    expect(getAvailableCurrencies).toBeCalledWith(currencies, "TEST_AFFIL");
    expect(wrapper.prop("value").available).toEqual(mockAvailable);
  });

  test("current - with requested currency", () => {
    const mockCurrent = {
      huf: {
        id: "huf",
        name: "Hungarian Forint",
        format: "__price__ Ft",
        uncertainFormat: false,
        round: "0",
        enabledOnAffilId: "",
        fallback: "",
        rate: 0.00312772,
      },
    };

    // $FlowIssue
    resolveCurrency.mockReturnValue(mockCurrent);

    // $FlowIssue
    getRequestCurrency.mockReturnValue("REQ");

    const wrapper = shallow(
      // $FlowIssue
      <Provider.WrappedComponent
        all={currencies}
        countries={countries}
        fromLanguage="LNG"
        location={{ search: "" }}
      >
        Content
      </Provider.WrappedComponent>,
    );

    wrapper.setState({ selected: "SEL" });

    wrapper.update();

    expect(resolveCurrency).toBeCalledWith(currencies, currencies, ["SEL", "REQ", null, "LNG"]);
    expect(fetchGeoData).not.toBeCalled();
    expect(wrapper.prop("value").current).toEqual(mockCurrent);
  });

  test("current - by country", async () => {
    const promise = Promise.resolve({
      geoIP: {
        isoCountryCode: "cz",
      },
    });

    // $FlowIssue
    fetchGeoData.mockReturnValue(promise);

    const wrapper = shallow(
      // $FlowIssue
      <Provider.WrappedComponent
        all={currencies}
        countries={countries}
        fromLanguage="LNG"
        location={{ search: "" }}
      >
        Content
      </Provider.WrappedComponent>,
    );

    wrapper.setState({ selected: "SEL" });

    await promise;

    wrapper.update();

    expect(resolveCurrency).toBeCalledWith(currencies, currencies, ["SEL", null, "czk", "LNG"]);
    expect(fetchGeoData).toBeCalled();
  });

  test("current - by country - country unknown", async () => {
    const promise = Promise.resolve({
      geoIP: {
        isoCountryCode: "test",
      },
    });

    // $FlowIssue
    fetchGeoData.mockReturnValue(promise);

    const wrapper = shallow(
      // $FlowIssue
      <Provider.WrappedComponent
        all={currencies}
        countries={countries}
        fromLanguage="LNG"
        location={{ search: "" }}
      >
        Content
      </Provider.WrappedComponent>,
    );

    wrapper.setState({ selected: "SEL" });

    await promise;

    wrapper.update();

    expect(resolveCurrency).toBeCalledWith(currencies, currencies, ["SEL", null, null, "LNG"]);
    expect(fetchGeoData).toBeCalled();
  });

  test("current - by country - fetch failed", async () => {
    const promise = Promise.reject();

    // $FlowIssue
    fetchGeoData.mockReturnValue(promise);

    const wrapper = shallow(
      // $FlowIssue
      <Provider.WrappedComponent
        all={currencies}
        countries={countries}
        fromLanguage=""
        location={{ search: "" }}
      >
        Content
      </Provider.WrappedComponent>,
    );

    await promise.catch(() => null);

    wrapper.update();

    expect(resolveCurrency).toBeCalledWith(currencies, currencies, [null, null, null, ""]);
    expect(fetchGeoData).toBeCalled();
  });

  test("setCurrency", () => {
    const wrapper = shallow(
      // $FlowIssue
      <Provider.WrappedComponent
        all={currencies}
        countries={countries}
        fromLanguage=""
        location={{ search: "" }}
      >
        Content
      </Provider.WrappedComponent>,
    );

    wrapper.instance().setCurrency("czk");

    wrapper.update();

    expect(resolveCurrency).toBeCalledWith(currencies, currencies, ["czk", null, null, ""]);
    expect(wrapper.state("selected")).toBe("czk");
    expect(store.saveValue).toBeCalledWith("czk");
  });

  test("setCurrency - unknown", () => {
    const wrapper = shallow(
      // $FlowIssue
      <Provider.WrappedComponent
        all={currencies}
        countries={countries}
        fromLanguage=""
        location={{ search: "" }}
      >
        Content
      </Provider.WrappedComponent>,
    );

    wrapper.instance().setCurrency("TST");

    wrapper.update();

    expect(resolveCurrency).toBeCalledWith(currencies, currencies, [null, null, null, ""]);
    expect(wrapper.state("selected")).toBe(null);
    expect(store.saveValue).not.toBeCalledWith();
  });

  test("rates", async () => {
    const mockRates = {
      currencies: {
        edges: [{ code: "czk", rate: 2 }],
      },
    };

    const promise = Promise.resolve(mockRates);

    // $FlowIssue
    fetchRatesData.mockReturnValue(promise);

    const mockResolved = {
      czk: {
        id: "czk",
        name: "Czech Republic Koruna",
        format: "__price__ Kč",
        uncertainFormat: false,
        round: "0",
        enabledOnAffilId: "",
        fallback: "",
        rate: 2,
      },
    };

    // $FlowIssue
    resolveRates.mockReturnValue(mockResolved);

    const wrapper = shallow(
      // $FlowIssue
      <Provider.WrappedComponent
        all={currencies}
        countries={countries}
        fromLanguage=""
        location={{ search: "" }}
      >
        Content
      </Provider.WrappedComponent>,
    );

    await promise;

    wrapper.update();

    expect(fetchRatesData).toBeCalled();
    expect(resolveRates).toBeCalledWith(mockRates, currencies);
    expect(wrapper.prop("value").available).toEqual(mockResolved);
  });

  test("rates - fetch dailed", async () => {
    const promise = Promise.reject();

    // $FlowIssue
    fetchRatesData.mockReturnValue(promise);

    const wrapper = shallow(
      // $FlowIssue
      <Provider.WrappedComponent
        all={currencies}
        countries={countries}
        fromLanguage=""
        location={{ search: "" }}
      >
        Content
      </Provider.WrappedComponent>,
    );

    await promise.catch(() => null);

    wrapper.update();

    expect(fetchRatesData).toBeCalled();
    expect(resolveRates).not.toBeCalledWith();
    expect(wrapper.prop("value").available).toEqual(currencies);
  });
});
