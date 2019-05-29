// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";

import currencies from "../../../../../records/__mocks__/Currencies";

import Menu from "..";

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

    expect(wrapper.find("Menu__Container").exists()).toBe(true);
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
