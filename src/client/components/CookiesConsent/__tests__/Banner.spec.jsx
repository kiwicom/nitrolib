// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Banner from "../Banner";

describe("#CookiesConsent - Banner", () => {
  test("render", () => {
    const showInfo = jest.fn();
    const accept = jest.fn();

    const wrapper = shallow(<Banner showInfo={showInfo} accept={accept} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("click show info", () => {
    const showInfo = jest.fn();
    const accept = jest.fn();

    const wrapper = shallow(<Banner showInfo={showInfo} accept={accept} />);

    wrapper.find('[data-test="CookiesConsent-ShowInfo"]').simulate("click");

    expect(showInfo).toBeCalled();
    expect(accept).not.toBeCalled();
  });

  test("click accept", () => {
    const showInfo = jest.fn();
    const accept = jest.fn();

    const wrapper = shallow(<Banner showInfo={showInfo} accept={accept} />);

    wrapper.find('[data-test="CookiesConsent-Accept"]').simulate("click");

    expect(showInfo).not.toBeCalled();
    expect(accept).toBeCalled();
  });
});
