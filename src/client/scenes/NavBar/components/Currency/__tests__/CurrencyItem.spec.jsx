// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CurrencyItem from "../CurrencyItem";

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

describe("#Currency/CurrencyItem", () => {
  test("render", () => {
    const wrapper = shallow(<CurrencyItem currency={currency} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - with sign separator", () => {
    const wrapper = shallow(<CurrencyItem currency={currency} separatorSign={<span>SIGN</span>} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - with name", () => {
    const wrapper = shallow(
      <CurrencyItem currency={currency} showName separatorName={<span>NAME</span>} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
