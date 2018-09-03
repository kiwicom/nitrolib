// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import SideBar from "../index";

describe("#index", () => {
  test("render - with target", () => {
    const target = document.createElement("div");
    target.setAttribute("id", "sidebar");

    if (document.body) {
      document.body.appendChild(target);
    }

    const wrapper = mount(
      <SideBar onClick={jest.fn()} shown>
        <p>Content</p>
      </SideBar>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(document.getElementById("sidebar")).toMatchSnapshot();

    wrapper.unmount();

    expect(wrapper).toMatchSnapshot();
    expect(document.getElementById("sidebar")).toMatchSnapshot();

    if (document.body) {
      document.body.removeChild(target);
    }
  });

  test("render - without target", () => {
    const wrapper = mount(
      <SideBar onClick={jest.fn()} shown>
        <p>Content</p>
      </SideBar>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(document.getElementById("sidebar")).toMatchSnapshot();

    wrapper.unmount();

    expect(wrapper).toMatchSnapshot();
    expect(document.getElementById("sidebar")).toMatchSnapshot();
  });

  test("on click container", () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <SideBar onClick={onClick} shown>
        <p>Content</p>
      </SideBar>,
    );

    wrapper.find("SideBar__Container").simulate("click");

    expect(onClick).toBeCalled();
  });

  test("on click wrapper", () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <SideBar onClick={onClick} shown>
        <p>Content</p>
      </SideBar>,
    );

    wrapper.find("SideBar__Wrapper").simulate("click");

    expect(onClick).not.toBeCalled();
  });
});
