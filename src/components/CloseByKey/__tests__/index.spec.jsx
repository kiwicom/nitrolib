// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CloseByKey from "..";

describe("#CloseByKey", () => {
  test("render", () => {
    const wrapper = shallow(
      <CloseByKey onClose={jest.fn()}>
        <h1>kek</h1>
      </CloseByKey>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("close on specified key", () => {
    const map = {};
    // $FlowExpected: TODO describe
    document.body.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const onClose = jest.fn();
    shallow(
      <CloseByKey onClose={onClose} closeKey="Home">
        <h1>kek</h1>
      </CloseByKey>,
    );

    const stopPropagation = jest.fn();
    map.keydown({ key: "Home", stopPropagation });

    expect(stopPropagation).toBeCalled();
    expect(onClose).toBeCalled();
  });

  test("not close on other keys", () => {
    const map = {};
    // $FlowExpected: TODO describe
    document.body.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const onClose = jest.fn();
    shallow(
      <CloseByKey onClose={onClose} closeKey="Home">
        <h1>kek</h1>
      </CloseByKey>,
    );

    const stopPropagation = jest.fn();
    map.keydown({ key: "Delete", stopPropagation });

    expect(stopPropagation).toBeCalled();
    expect(onClose).not.toBeCalled();
  });

  test("stop listening on unmount", () => {
    const map = {};
    // $FlowExpected: TODO describe
    document.body.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const removeListener = jest.fn();
    // $FlowExpected: TODO describe
    document.body.removeEventListener = removeListener;

    const onClose = jest.fn();
    const wrapper = shallow(
      <CloseByKey onClose={onClose}>
        <h1>kek</h1>
      </CloseByKey>,
    );

    wrapper.instance().componentWillUnmount();

    expect(removeListener).toBeCalledWith("keydown", map.keydown);
  });
});
