// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import currencies from "../../../../../records/__mocks__/Currencies";
import NativePicker from "../index";

const current = currencies.eur;

const available = [currencies.gbp, currencies.eur, currencies.czk, currencies.usd];

const recommended = [currencies.eur, currencies.czk, currencies.gbp];

describe("#Currency/NativePicker", () => {
  test("render", () => {
    const wrapper = shallow(
      <NativePicker
        current={current}
        available={available}
        recommended={recommended}
        onChange={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
