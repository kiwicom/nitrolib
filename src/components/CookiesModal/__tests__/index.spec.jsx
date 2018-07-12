// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CookiesModal from "..";

describe("#CookiesModal", () => {
  test("render", () => {
    const wrapper = shallow(<CookiesModal onClose={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("pass close", () => {
    const onClose = jest.fn();
    const wrapper = shallow(<CookiesModal onClose={onClose} />);

    expect(wrapper.find("Modal").prop("onClose")).toBe(onClose);
  });
});
