// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Button from "..";

describe("#Button", () => {
  it("should has ariaLabel", () => {
    const wrapper = mount(
      <Button onClick={jest.fn()} ariaLabel="kek">
        bur
      </Button>,
    );
    expect(wrapper.find("StyledComponent").prop("aria-label")).toEqual("kek");
  });
});
