// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { CurrencyItemUnwrapped as CurrencyItem } from "../CurrencyItem";

const item: any = {
  code: "eur",
  format: "__price__ €",
};

describe("#Currency/CurrencyItem", () => {
  test("render", () => {
    const wrapper = shallow(<CurrencyItem item={item} />);

    expect(wrapper).toMatchSnapshot();
  });
});
