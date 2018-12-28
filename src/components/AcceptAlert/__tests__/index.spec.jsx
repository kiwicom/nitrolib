// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AcceptAlert from "..";

// TODO test styled components everywhere using 'mount', or try traverse and render
describe("#AcceptAlert", () => {
  test("render", () => {
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

  test("render - button", () => {
    const wrapper = shallow(
      <AcceptAlert onClose={jest.fn()} button={<span className="Submit">Submit</span>}>
        <p>Content</p>
      </AcceptAlert>,
    );

    expect(
      wrapper
        .find("Button")
        .children()
        .is(".Submit"),
    ).toBe(true);
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
