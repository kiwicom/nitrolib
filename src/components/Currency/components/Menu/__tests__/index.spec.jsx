// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";
import { breakpoints } from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import Menu from "..";

const currencies = {
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
  usd: {
    id: "usd",
    name: "US Dollar",
    format: "$ __price__",
    uncertainFormat: true,
    round: "2",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.855903,
  },
};

const current = currencies.eur;

const available = [currencies.gbp, currencies.eur, currencies.czk, currencies.usd];

const recommended = [currencies.eur, currencies.czk, currencies.gbp];

describe("#Currency/Menu", () => {
  test("render", () => {
    const tablet = 13;
    const desktop = 37;
    const wrapper = mount(
      <Menu
        current={current}
        available={available}
        recommended={recommended}
        positionMenuTablet={tablet}
        positionMenuDesktop={desktop}
        onChange={jest.fn()}
      />,
    );

    expect(wrapper.find("Menu__Container")).toHaveStyleRule("left", "inherit", {
      media: breakpoints.largeMobile,
    });

    expect(wrapper.find("Menu__Container")).toHaveStyleRule("right", `${desktop}px`, {
      media: breakpoints.desktop,
    });
  });

  test("recommended", () => {
    const wrapper = shallow(
      <Menu
        current={current}
        available={available}
        recommended={recommended}
        onChange={jest.fn()}
      />,
    );

    expect(wrapper.find("Menu__Recommended").exists()).toBe(true);
  });

  test("no recommended", () => {
    const wrapper = shallow(
      <Menu current={current} available={available} recommended={[]} onChange={jest.fn()} />,
    );

    expect(wrapper.find("Menu__Recommended").exists()).toBe(false);
  });

  // FIXME remove this eventually
  test("notifies about visibility change", () => {
    const onSetModal = jest.fn();

    const wrapper = shallow(
      <Menu
        current={current}
        available={available}
        recommended={recommended}
        onChange={jest.fn()}
        onSetModal={onSetModal}
      />,
    );

    expect(onSetModal).toBeCalledTimes(1);
    expect(onSetModal).toBeCalledWith("currencyMenu");

    onSetModal.mockReset();
    wrapper.unmount();

    expect(onSetModal).toBeCalledTimes(1);
    expect(onSetModal).toBeCalledWith("");
  });

  test("not notifies about visibility change", () => {
    const wrapper = shallow(
      <Menu
        current={current}
        available={available}
        recommended={recommended}
        onChange={jest.fn()}
      />,
    );

    wrapper.unmount();
    // No blowup - OK
  });
});
