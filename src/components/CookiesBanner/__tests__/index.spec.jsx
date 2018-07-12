// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CookiesBanner from "..";

describe("#CookiesBanner", () => {
  test("render", () => {
    const wrapper = shallow(<CookiesBanner onShowInfo={jest.fn()} onAccept={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("click show info", () => {
    const onShowInfo = jest.fn();
    const wrapper = shallow(<CookiesBanner onShowInfo={onShowInfo} onAccept={jest.fn()} />);

    wrapper.find("CookiesBanner__InfoLink").simulate("click");

    expect(onShowInfo).toBeCalled();
  });

  test("click accept", () => {
    const onAccept = jest.fn();

    const wrapper = shallow(<CookiesBanner onShowInfo={jest.fn()} onAccept={onAccept} />);

    wrapper.find("CookiesBanner__AcceptButton").simulate("click");

    expect(onAccept).toBeCalled();
  });
});
