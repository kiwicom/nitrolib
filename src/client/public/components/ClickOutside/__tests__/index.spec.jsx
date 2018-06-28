// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";

import ClickOutside from "../index";

describe("#ClickOutside", () => {
  test("mount", () => {
    // $FlowExpected
    document.addEventListener = jest.fn();
    const wrapper = mount(<ClickOutside onClickOutside={jest.fn()}>kek</ClickOutside>);

    const instance = wrapper.instance();

    expect(document.addEventListener).toBeCalledWith("click", instance.handleClickOutside, true);
  });

  test("unmount", () => {
    // $FlowExpected
    document.removeEventListener = jest.fn();
    const wrapper = shallow(<ClickOutside onClickOutside={jest.fn()}>kek</ClickOutside>);

    const instance = wrapper.instance();
    wrapper.unmount();

    expect(document.removeEventListener).toBeCalledWith("click", instance.handleClickOutside, true);
  });

  test("handler", () => {
    const onClickOutside = jest.fn();
    const wrapper = shallow(<ClickOutside onClickOutside={onClickOutside}>kek</ClickOutside>);

    const instance = wrapper.instance();

    instance.node = document.createElement("div");
    const node = document.createElement("div");

    const ev = { target: node };
    instance.handleClickOutside(ev);

    expect(onClickOutside).toBeCalledWith(ev);
  });

  test("handler - no node", () => {
    const onClickOutside = jest.fn();
    const wrapper = shallow(<ClickOutside onClickOutside={onClickOutside}>kek</ClickOutside>);

    const instance = wrapper.instance();
    const node = document.createElement("div");

    const ev = { target: node };
    instance.handleClickOutside(ev);

    expect(onClickOutside).not.toBeCalled();
  });

  test("handler - click inside", () => {
    const onClickOutside = jest.fn();
    const wrapper = shallow(<ClickOutside onClickOutside={onClickOutside}>kek</ClickOutside>);

    const instance = wrapper.instance();

    instance.node = document.createElement("div");
    const node = document.createElement("div");
    instance.node.appendChild(node);

    const ev = { target: node };
    instance.handleClickOutside(ev);

    expect(onClickOutside).not.toBeCalled();
  });
});
