import * as React from "react";
import { shallow } from "enzyme";

import CookiesConsent from "..";

describe("#CookiesConsent", () => {
  test("render - cookies not accepted", () => {
    const wrapper = shallow(<CookiesConsent onAccept={jest.fn()} />);

    expect(wrapper.find("[data-test='CookiesConsent']").exists()).toBe(true);
  });

  test("render - cookies accepted", () => {
    const wrapper = shallow(<CookiesConsent onAccept={jest.fn()} />);

    wrapper.setState({ accepted: true });

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  test("accept cookies", () => {
    const onAccept = jest.fn();
    const wrapper = shallow(<CookiesConsent onAccept={onAccept} />);

    wrapper.instance().handleAccept();

    expect(onAccept).toBeCalled();
    expect(wrapper.state("accepted")).toBe(true);
  });
});
