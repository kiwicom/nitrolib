import * as React from "react";
import { shallow } from "enzyme";

import CookiesPopup from "..";

describe("#CookiesConsent", () => {
  test("render - cookies not accepted", () => {
    const wrapper = shallow(<CookiesPopup onAccept={jest.fn()} />);

    expect(wrapper.find("[data-test='CookiesPopup']").exists()).toBe(true);
  });

  test("render banner", () => {
    const wrapper = shallow(<CookiesPopup onAccept={jest.fn()} type="banner" />);

    expect(wrapper.find("[data-test='CookiesPopup']").exists()).toBe(true);
  });

  test("render - cookies accepted", () => {
    const wrapper = shallow(<CookiesPopup onAccept={jest.fn()} />);

    wrapper.setState({ accepted: true });

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  test("accept cookies", () => {
    const onAccept = jest.fn();
    const wrapper = shallow(<CookiesPopup onAccept={onAccept} />);

    wrapper.instance().handleAccept();

    expect(onAccept).toBeCalled();
    expect(wrapper.state("accepted")).toBe(true);
  });
});
