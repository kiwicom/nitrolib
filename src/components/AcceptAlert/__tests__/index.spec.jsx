// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";

import AcceptAlert from "..";

import { themeDefault } from "../../../records/Theme";

describe("#AcceptAlert", () => {
  test("render", () => {
    const wrapper = mount(
      <AcceptAlert onClose={jest.fn()}>
        <p>Content</p>
      </AcceptAlert>,
    );

    expect(wrapper.find("AcceptAlert__Container")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteWhite,
    );
  });

  test("render translate", () => {
    const wrapper = shallow(
      <AcceptAlert onClose={jest.fn()}>
        <p>Content</p>
      </AcceptAlert>,
    );

    expect(
      wrapper
        .find("Button")
        .children("Translate")
        .exists(),
    ).toBe(true);
  });

  test("render button", () => {
    const wrapper = shallow(
      <AcceptAlert onClose={jest.fn()} button={<span>Submit</span>}>
        <p>Content</p>
      </AcceptAlert>,
    );

    expect(
      wrapper
        .find("Button")
        .children("span")
        .text(),
    ).toBe("Submit");
  });

  test("close", () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <AcceptAlert onClose={onClose}>
        <p>Content</p>
      </AcceptAlert>,
    );

    wrapper.find("Button").simulate("click");

    expect(onClose).toBeCalled();
  });
});
