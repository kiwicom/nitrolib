// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Select from "..";

describe("#Select", () => {
  test("render", () => {
    const wrapper = shallow(
      <Select id="select" value="kek" onChange={jest.fn()}>
        <option value="kek">lol</option>
        <option value="bur">wow</option>
      </Select>,
    );

    expect(wrapper.find("Select__StyledSelect").prop("value")).toBe("kek");
  });
});
