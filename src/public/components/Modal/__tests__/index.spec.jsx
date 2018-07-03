// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Modal from "../index";

describe("#Modal", () => {
  test("render", () => {
    const onClose = jest.fn();

    const wrapper = shallow(
      <Modal onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("pass onClose", () => {
    const onClose = jest.fn();

    const wrapper = shallow(
      <Modal onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );

    expect(wrapper.find("ModalOverlay").prop("onClose")).toBe(onClose);
  });
});
