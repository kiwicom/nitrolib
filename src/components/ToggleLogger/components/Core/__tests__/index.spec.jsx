// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Core from "..";

describe("#ToggleLogger/Core", () => {
  test("firing when not open", () => {
    const handleOpen = jest.fn();
    const handleToggle = jest.fn();
    const wrapper = shallow(
      <Core onOpen={handleOpen} onToggle={handleToggle} open={false}>
        {({ open, onToggle }) => (
          <div onToggle={onToggle} open={open}>
            LOL
          </div>
        )}
      </Core>,
    );

    wrapper.instance().handleToggle();

    expect(handleOpen).toBeCalled();
    expect(handleToggle).toBeCalled();
  });

  test("not firing when open", () => {
    const handleOpen = jest.fn();
    const handleToggle = jest.fn();
    const wrapper = shallow(
      <Core onOpen={handleOpen} onToggle={handleToggle} open>
        {({ open, onToggle }) => (
          <div onToggle={onToggle} open={open}>
            LOL
          </div>
        )}
      </Core>,
    );

    wrapper.instance().handleToggle();

    expect(handleOpen).not.toBeCalled();
    expect(handleToggle).toBeCalled();
  });
});
