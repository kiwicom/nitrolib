// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CurrencyItem from "../CurrencyItem";

const item: any = {
  id: "eur",
  code: "eur",
  format: "__price__ €",
};

describe("#Currency/CustomPicker/CurrencyItem", () => {
  test("render", () => {
    const wrapper = shallow(<CurrencyItem item={item} />);

    expect(wrapper).toMatchSnapshot();
  });
});
