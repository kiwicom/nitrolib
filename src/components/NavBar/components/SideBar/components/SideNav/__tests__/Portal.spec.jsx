// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Portal from "../Portal";

describe("#Modal - Portal", () => {
  test("render - with target", () => {
    const target = document.createElement("div");
    target.setAttribute("id", "sidenav");

    if (document.body) {
      document.body.appendChild(target);
    }

    const wrapper = mount(
      <Portal>
        <p>Content</p>
      </Portal>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(document.getElementById("modal")).toMatchSnapshot();

    wrapper.unmount();

    expect(wrapper).toMatchSnapshot();
    expect(document.getElementById("modal")).toMatchSnapshot();

    if (document.body) {
      document.body.removeChild(target);
    }
  });

  test("render - without target", () => {
    const wrapper = mount(
      <Portal>
        <p>Content</p>
      </Portal>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(document.getElementById("modal")).toMatchSnapshot();

    wrapper.unmount();

    expect(wrapper).toMatchSnapshot();
    expect(document.getElementById("modal")).toMatchSnapshot();
  });
});
