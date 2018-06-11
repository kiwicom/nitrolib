// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { MenuUnwrapped as Menu } from "../Menu";

const available = {
  dkk: {
    id: "dkk",
    name: "Danish Krone",
    format: "__price__ kr",
    uncertainFormat: true,
    round: "0",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.13434,
  },
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
};

const current = {
  id: "gbp",
  name: "British Pound Sterling",
  format: "£__price__",
  uncertainFormat: false,
  round: "2",
  enabledOnAffilId: "",
  fallback: "",
  rate: 1.14355,
};

const list: any = {
  edges: [
    {
      node: {
        code: "eur",
        name: "Euro",
      },
    },
    {
      node: {
        code: "huf",
        name: "Hungarian Forint",
      },
    },
  ],
};

const geo: any = {
  isoCountryCode: "GB",
};

describe("#Currency/Menu", () => {
  test("render", () => {
    const wrapper = shallow(
      <Menu
        available={available}
        current={current}
        geo={geo}
        list={list}
        onSetCurrency={jest.fn()}
        onHide={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("set currency", () => {
    const onSetCurrency = jest.fn();
    const onHide = jest.fn();
    const wrapper = shallow(
      <Menu
        available={available}
        current={current}
        geo={geo}
        list={list}
        onSetCurrency={onSetCurrency}
        onHide={onHide}
      />,
    );

    wrapper.instance().handleSetCurrency("czk");

    expect(onSetCurrency).toBeCalledWith("czk");
    expect(onHide).toBeCalled();
  });
});
