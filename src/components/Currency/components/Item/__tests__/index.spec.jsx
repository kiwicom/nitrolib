// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import currencies from "../../../../../records/__mocks__/Currencies";
import { getCode, getSymbol } from "../../../../../records/Currency";

import Item from "..";

describe("#Currency/Item", () => {
  test("render", () => {
    const wrapper = shallow(<Item item={currencies.eur} />);

    expect(wrapper.find("Code").text()).toBe(getCode(currencies.eur.code));
    expect(wrapper.find("Sign").text()).toBe(getSymbol(currencies.eur.format.format));
    expect(wrapper.find("Name").text()).toBe(currencies.eur.name);
  });
});
