import * as React from "react";
import { shallow, mount } from "enzyme";

import Accommodation from "..";
import mockedData from "../mockedData.js";
import { themeDefault } from "../../../records/Theme";

const props = {};

describe("#Accommodation", () => {
  test("render", () => {
    const wrapper = mount(<Accommodation {...mockedData} />);

    expect(wrapper.find("Accommodation__Wrapper")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteWhite
    );
  });

  test("isModalOpen", () => {
    const wrapper = shallow(<Accommodation {...mockedData} />);

    console.log(wrapper.debug());
    expect(wrapper.state().isModalOpen).toBe(false);
    wrapper.instance().openAccommodationModal();
    expect(wrapper.state().isModalOpen).toBe(true);

    wrapper.instance().closeAccommodationModal();
    expect(wrapper.state().isModalOpen).toBe(false);
  });
});
