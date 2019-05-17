// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CloseByKey from "..";

describe("#CloseByKey", () => {
  beforeEach(() => {
    document.body = document.createElement("body");
  });

  test("mount without body", () => {
    // $FlowExpected: Overriding document stuff like a boss
    document.body.remove();

    const onClose = jest.fn();
    const wrapper = shallow(
      <CloseByKey onClose={onClose}>
        <h1>kek</h1>
      </CloseByKey>,
    );

    expect(wrapper.contains("kek")).toBe(true);
  });

  test("unmount without body", () => {
    // $FlowExpected: Overriding document stuff like a boss
    document.body.remove();

    const onClose = jest.fn();
    const wrapper = shallow(
      <CloseByKey onClose={onClose}>
        <h1>kek</h1>
      </CloseByKey>,
    );

    expect(wrapper.contains("kek")).toBe(true);

    wrapper.unmount();
  });

  test("close on escape", () => {
    // $FlowExpected: Overriding document stuff like a boss
    document.body.addEventListener = jest.fn();

    const onClose = jest.fn();
    const wrapper = shallow(
      <CloseByKey onClose={onClose}>
        <h1>kek</h1>
      </CloseByKey>,
    );

    const { handleKeyDown } = wrapper.instance();
    // $FlowExpected: document.body exists
    expect(document.body.addEventListener).toBeCalledWith("keydown", handleKeyDown);

    const stopPropagation = jest.fn();
    handleKeyDown({ key: "Escape", stopPropagation });

    expect(stopPropagation).toBeCalled();
    expect(onClose).toBeCalledWith({ key: "Escape", stopPropagation });
  });

  test("not close on other keys", () => {
    // $FlowExpected: Overriding document stuff like a boss
    document.body.addEventListener = jest.fn();

    const onClose = jest.fn();
    const wrapper = shallow(
      <CloseByKey onClose={onClose}>
        <h1>kek</h1>
      </CloseByKey>,
    );

    const { handleKeyDown } = wrapper.instance();
    // $FlowExpected: document.body exists
    expect(document.body.addEventListener).toBeCalledWith("keydown", handleKeyDown);

    const stopPropagation = jest.fn();
    handleKeyDown({ key: "Delete", stopPropagation });

    expect(stopPropagation).toBeCalled();
    expect(onClose).not.toBeCalled();
  });

  test("stop listening on unmount", () => {
    // $FlowExpected: Overriding document stuff like a boss
    document.body.removeEventListener = jest.fn();

    const onClose = jest.fn();
    const wrapper = shallow(
      <CloseByKey onClose={onClose}>
        <h1>kek</h1>
      </CloseByKey>,
    );

    const { handleKeyDown } = wrapper.instance();

    wrapper.unmount();

    // $FlowExpected: document.body exists
    expect(document.body.removeEventListener).toBeCalledWith("keydown", handleKeyDown);
  });
});
