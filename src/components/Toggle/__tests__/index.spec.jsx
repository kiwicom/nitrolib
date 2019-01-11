// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Toggle from "..";

describe("#Toggle", () => {
  test("render", () => {
    const wrapper = mount(
      <Toggle>
        {({ open, onToggle }) => (
          <button type="button" onClick={onToggle} open={open}>
            <h1>LOL</h1>
            {open && <p>Kek</p>}
          </button>
        )}
      </Toggle>,
    );

    expect(wrapper.contains(<p>Kek</p>)).toBe(false);
  });

  test("render initial", () => {
    const wrapper = mount(
      <Toggle initial>
        {({ open, onToggle }) => (
          <button type="button" onClick={onToggle} open={open}>
            <h1>LOL</h1>
            {open && <p>Kek</p>}
          </button>
        )}
      </Toggle>,
    );

    expect(wrapper.contains(<p>Kek</p>)).toBe(true);
  });

  test("toggle", () => {
    const wrapper = mount(
      <Toggle>
        {({ open, onToggle }) => (
          <button type="button" onClick={onToggle} open={open}>
            <h1>LOL</h1>
            {open && <p>Kek</p>}
          </button>
        )}
      </Toggle>,
    );

    const button = wrapper.find("button");

    button.simulate("click");
    expect(wrapper.state("open")).toBe(true);

    button.simulate("click");
    expect(wrapper.state("open")).toBe(false);
  });
});
