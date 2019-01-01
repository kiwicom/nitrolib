// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Item from "..";

import { getCode, getSymbol } from "../../../../../records/Currency";

const item: any = {
  id: "eur",
  code: "eur",
  format: "__price__ €",
  name: "Euro",
};

describe("#Currency/Item", () => {
  test("render", () => {
    const wrapper = shallow(<Item item={item} />);

    expect(wrapper.find("Code").text()).toBe(getCode(item.code));
    expect(wrapper.find("Sign").text()).toBe(getSymbol(item.format));
    expect(wrapper.find("Name").text()).toBe(item.name);
  });
});
