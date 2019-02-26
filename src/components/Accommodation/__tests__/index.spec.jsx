// @flow
import * as React from "react";
import { shallow, mount } from "enzyme";

import Accommodation from "..";

import mockedData from "../mockedData";
import { themeDefault } from "../../../records/Theme";

describe("#Accommodation", () => {
  test("render", () => {
    const wrapper = mount(<Accommodation {...mockedData} />);

    expect(wrapper.find("Accommodation__Wrapper")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteWhite,
    );
  });

  test("isModalOpen", () => {
    const wrapper = shallow(<Accommodation {...mockedData} />);

    expect(wrapper.state().isModalOpen).toBe(false);
    wrapper.instance().openAccommodationModal();
    expect(wrapper.state().isModalOpen).toBe(true);

    wrapper.instance().closeAccommodationModal();
    expect(wrapper.state().isModalOpen).toBe(false);
  });
});
