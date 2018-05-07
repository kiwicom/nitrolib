// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Banner from "../Banner";

describe("#CookiesConsent/Banner", () => {
  test("render", () => {
    const wrapper = shallow(<Banner onShowInfo={jest.fn()} onAccept={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("click show info", () => {
    const onShowInfo = jest.fn();
    const wrapper = shallow(<Banner onShowInfo={onShowInfo} onAccept={jest.fn()} />);

    wrapper.find("Banner__InfoLink").simulate("click");

    expect(onShowInfo).toBeCalled();
  });

  test("click accept", () => {
    const onAccept = jest.fn();

    const wrapper = shallow(<Banner onShowInfo={jest.fn()} onAccept={onAccept} />);

    wrapper.find("Banner__AcceptButton").simulate("click");

    expect(onAccept).toBeCalled();
  });
});
