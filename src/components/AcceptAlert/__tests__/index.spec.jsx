// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AcceptAlert from "..";

describe("#AcceptAlert", () => {
  test("render", () => {
    const wrapper = shallow(
      <AcceptAlert onClose={jest.fn()}>
        <p>Content</p>
      </AcceptAlert>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render - button", () => {
    const wrapper = shallow(
      <AcceptAlert onClose={jest.fn()} button={<span>Submit</span>}>
        <p>Content</p>
      </AcceptAlert>,
    );

    expect(wrapper).toMatchSnapshot();
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
