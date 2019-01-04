// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Core from "..";

describe("#index", () => {
  beforeEach(() => {
    document.body = document.createElement("body");
  });

  test("render exiting", () => {
    const wrapper = mount(
      <Core onClick={jest.fn()} status="exiting">
        <h1>Kek</h1>
      </Core>,
    );

    const container = wrapper.find("Core__Container");
    const wrappr = wrapper.find("Core__Wrapper");

    expect(container).toHaveStyleRule("visibility", "visible");
    expect(container).toHaveStyleRule("background-color", "transparent");
    expect(wrappr).toHaveStyleRule("transform", "translate3d(480px,0,0)");
  });

  test("render exited", () => {
    const wrapper = mount(
      <Core onClick={jest.fn()} status="exited">
        <h1>Kek</h1>
      </Core>,
    );

    const container = wrapper.find("Core__Container");
    const wrappr = wrapper.find("Core__Wrapper");

    expect(container).toHaveStyleRule("visibility", "hidden");
    expect(container).toHaveStyleRule("background-color", "transparent");
    expect(wrappr).toHaveStyleRule("transform", "translate3d(480px,0,0)");
  });

  test("render entered", () => {
    const wrapper = mount(
      <Core onClick={jest.fn()} status="entered">
        <h1>Kek</h1>
      </Core>,
    );

    const container = wrapper.find("Core__Container");
    const wrappr = wrapper.find("Core__Wrapper");

    expect(container).toHaveStyleRule("visibility", "visible");
    expect(container).toHaveStyleRule("background-color", "rgba(0,0,0,.5)");
    expect(wrappr).toHaveStyleRule("transform", "translate3d(0)");
  });

  test("mount", () => {
    const wrapper = mount(
      <Core onClick={jest.fn()} status="entered">
        <h1>Kek</h1>
      </Core>,
    );

    const { el } = wrapper.instance();
    // $FlowExpected: document.body is there
    expect(document.body.contains(el)).toBe(true);

    wrapper.unmount();

    // $FlowExpected: document.body is there
    expect(document.body.contains(el)).toBe(false);
  });

  test("mount no body", () => {
    // $FlowExpected: Overriding document stuff like a boss
    document.body.remove();

    const wrapper = mount(
      <Core onClick={jest.fn()} status="entered">
        <h1>Kek</h1>
      </Core>,
    );

    // No blowup
    wrapper.unmount();
    // No blowup
  });

  test("on click container", () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Core onClick={onClick} status="entered">
        <h1>Kek</h1>
      </Core>,
    );

    wrapper.find("Core__Container").simulate("click");

    expect(onClick).toBeCalled();
  });

  test("on click wrapper", () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Core onClick={onClick} status="entered">
        <h1>Kek</h1>
      </Core>,
    );

    wrapper.find("Core__Wrapper").simulate("click");

    expect(onClick).not.toBeCalled();
  });
});
