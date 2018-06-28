// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import InfoModal from "../index";

describe("#CookiesConsent/InfoModal", () => {
  test("render", () => {
    const wrapper = shallow(<InfoModal onClose={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("pass close", () => {
    const onClose = jest.fn();
    const wrapper = shallow(<InfoModal onClose={onClose} />);

    expect(wrapper.find("Modal").prop("onClose")).toBe(onClose);
  });
});
