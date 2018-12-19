// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import ValueBind from "..";

describe("#ValueBind", () => {
  test("handle click", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <ValueBind value="kek" onChange={onChange}>
        {jest.fn()}
      </ValueBind>,
    );

    wrapper.instance().handleClick();

    expect(onChange).toBeCalledWith("kek");
  });
});
