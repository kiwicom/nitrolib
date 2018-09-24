// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import ToggleLogger from "..";

describe("#ToggleLogger", () => {
  test("render", () => {
    const onOpen = jest.fn();
    const wrapper = shallow(
      <ToggleLogger onOpen={onOpen}>
        {({ open, onToggle }) => (
          <div onToggle={onToggle} open={open}>
            LOL
          </div>
        )}
      </ToggleLogger>,
    );

    expect(wrapper.dive().shallow()).toMatchSnapshot();
  });
});
