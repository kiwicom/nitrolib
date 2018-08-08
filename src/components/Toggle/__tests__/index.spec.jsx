// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Toggle from "../index";

describe("#Currency", () => {
  test("render", () => {
    const wrapper = shallow(
      <Toggle>
        {({ open, onToggle, active }) => (
          <div active={active} onToggle={onToggle} open={open}>
            LOL
          </div>
        )}
      </Toggle>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("toggle", () => {
    const wrapper = shallow(
      <Toggle>
        {({ open, onToggle, active }) => (
          <div active={active} onToggle={onToggle} open={open}>
            LOL
          </div>
        )}
      </Toggle>,
    );

    wrapper.instance().onToggle();
    expect(wrapper.state("open")).toBe(true);

    wrapper.instance().onToggle();
    expect(wrapper.state("open")).toBe(false);
  });
});
