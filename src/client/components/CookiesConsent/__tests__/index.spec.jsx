// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import * as store from "../services/store";
import CookiesConsent from "../index";

jest.mock("../services/store");

describe("#CookiesConsent", () => {
  test("render - cookies accepted", () => {
    // $FlowExpected
    store.isAccepted.mockReturnValue(true);

    const wrapper = shallow(<CookiesConsent />);

    expect(store.isAccepted).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });

  test("render - cookies not accepted", () => {
    // $FlowExpected
    store.isAccepted.mockReturnValue(false);

    const wrapper = shallow(<CookiesConsent />);

    expect(store.isAccepted).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });

  test("accept cookies", () => {
    // $FlowExpected
    store.isAccepted.mockReturnValue(false);

    const wrapper = shallow(<CookiesConsent />);

    wrapper.instance().handleAccept();
    wrapper.update();

    expect(store.saveAccepted).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });

  test("showInfo / hideInfo", () => {
    // $FlowExpected
    store.isAccepted.mockReturnValue(false);

    const wrapper = shallow(<CookiesConsent />);

    const instance = wrapper.instance();

    instance.handleShowInfo();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    instance.handleHideInfo();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
