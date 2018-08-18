// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CookiesConsent from "../index";

describe("#CookiesConsent", () => {
  test("render - cookies accepted", () => {
    const wrapper = shallow(<CookiesConsent accepted onAccept={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - cookies not accepted", () => {
    const wrapper = shallow(<CookiesConsent accepted={false} onAccept={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("accept cookies", () => {
    const onAccept = jest.fn();
    const wrapper = shallow(<CookiesConsent accepted onAccept={onAccept} />);

    wrapper.instance().handleAccept();

    expect(onAccept).toBeCalled();
  });
});
