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

  test("close on click", () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <ModalOverlay onClose={onClose}>
        <h1>kek</h1>
      </ModalOverlay>,
    );

    wrapper.find("ModalOverlay__StyledClose").simulate("click");

    expect(onClose).toBeCalled();
  });

  test("close on escape", () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <ModalOverlay onClose={onClose}>
        <h1>kek</h1>
      </ModalOverlay>,
    );

    wrapper.find("ModalOverlay__Container").simulate("keydown", { key: "Escape" });

    expect(onClose).toBeCalled();
  });

  test("not close on other keys", () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <ModalOverlay onClose={onClose}>
        <h1>kek</h1>
      </ModalOverlay>,
    );

    wrapper.find("ModalOverlay__Container").simulate("keydown", { key: "Enter" });

    expect(onClose).not.toBeCalled();
  });
});
