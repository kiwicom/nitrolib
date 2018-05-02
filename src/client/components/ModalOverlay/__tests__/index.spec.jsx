// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import ModalOverlay from "../index";

describe("#ModalOverlay", () => {
  test("render", () => {
    const wrapper = shallow(
      <ModalOverlay onClose={jest.fn()}>
        <h1>kek</h1>
      </ModalOverlay>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
