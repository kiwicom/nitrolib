// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import * as store from "client/services/cookies/store";

import typeof * as MockStore from "client/services/cookies/__mocks__/store";

import CookiesConsent from "../index";

jest.mock("client/services/cookies/store");

const mockStore: MockStore = store;

describe("#CookiesConsent", () => {
  test("render - cookies accepted", () => {
    mockStore.isAccepted.mockReturnValue(true);

    const wrapper = shallow(<CookiesConsent />);

    expect(mockStore.isAccepted).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });

  test("render - cookies not accepted", () => {
    mockStore.isAccepted.mockReturnValue(false);

    const wrapper = shallow(<CookiesConsent />);

    expect(mockStore.isAccepted).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });

  test("accept cookies", () => {
    mockStore.isAccepted.mockReturnValue(false);

    const wrapper = shallow(<CookiesConsent />);

    wrapper.instance().accept();
    wrapper.update();

    expect(mockStore.saveAccepted).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });

  test("showInfo / hideInfo", () => {
    mockStore.isAccepted.mockReturnValue(false);

    const wrapper = shallow(<CookiesConsent />);

    const instance = wrapper.instance();

    instance.showInfo();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    instance.hideInfo();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
