// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Current from "../Current";

const currency = {
  id: "eur",
  name: "Euro",
  format: "__price__ €",
  uncertainFormat: false,
  round: "2",
  enabledOnAffilId: "",
  fallback: "",
  rate: 1,
};

describe("#Currency/CustomPicker/CurrencyItem", () => {
  test("render", () => {
    const wrapper = shallow(<Current currency={currency} />);

    expect(wrapper).toMatchSnapshot();
  });
});
