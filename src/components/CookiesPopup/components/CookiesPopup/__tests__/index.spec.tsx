import * as React from "react";
import { shallow, mount } from "enzyme";

import CookiesPopup from "..";

describe("#CookiesPopup", () => {
  test("render", () => {
    const wrapper = mount(<CookiesPopup onAccept={jest.fn()} onCustomize={jest.fn()} />);

    expect(wrapper.find("Modal__ModalWrapperContent").exists()).toBe(true);
  });

  test("click accept", () => {
    const onAccept = jest.fn();

    const wrapper = shallow(<CookiesPopup onAccept={onAccept} onCustomize={jest.fn()} />);

    wrapper
      .find("Button")
      .last()
      .simulate("click");

    expect(onAccept).toBeCalled();
  });
});
