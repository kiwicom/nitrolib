// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import SideBar from "../index";

describe("#index", () => {
  test("render", () => {
    const wrapper = mount(
      <SideBar onClick={jest.fn()} shown>
        <p>Content</p>
      </SideBar>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(document.body).toMatchSnapshot();

    wrapper.unmount();

    expect(wrapper).toMatchSnapshot();
    expect(document.body).toMatchSnapshot();
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
