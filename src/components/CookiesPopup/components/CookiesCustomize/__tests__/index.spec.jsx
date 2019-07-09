// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";

import CookiesCustomize from "..";

import { themeDefault } from "../../../../../records/Theme";

describe("#CookiesCustomize", () => {
  test("render", () => {
    const wrapper = mount(
      <CookiesCustomize onAccept={jest.fn()} onClose={jest.fn()} />
    );

    expect(wrapper.find("Modal__ModalWrapperContent").exists()).toBe(true);
  });

  test("click accept", () => {
    const onAccept = jest.fn();

    const wrapper = shallow(
      <CookiesCustomize onAccept={onAccept} onClose={jest.fn()} />
    );

    wrapper
      .find("Button")
      .first()
      .simulate("click");

    expect(onAccept).toBeCalled();
  });

  test("click Close", () => {
    const onAccept = jest.fn();

    const wrapper = shallow(
      <CookiesCustomize onAccept={onAccept} onClose={jest.fn()} />
    );

    wrapper
      .find("Button")
      .last()
      .simulate("click");

    expect(onAccept).toBeCalled();
  });
});
