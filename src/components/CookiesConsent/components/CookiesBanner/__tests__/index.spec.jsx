// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CookiesBanner from "../index";

describe("#CookiesBanner", () => {
  test("render", () => {
    const wrapper = shallow(<CookiesBanner onAccept={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("click accept", () => {
    const onAccept = jest.fn();

    const wrapper = shallow(<CookiesBanner onAccept={onAccept} />);

    wrapper.find("CookiesBanner__AcceptButton").simulate("click");

    expect(onAccept).toBeCalled();
  });
});
