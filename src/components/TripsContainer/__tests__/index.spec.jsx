// @flow
import * as React from "react";
import { shallow } from "enzyme";

import TripsContainer from "..";

const Children = () => "Children";

describe("#TripsContainer", () => {
  test("test all props", () => {
    const wrapper = shallow(
      <TripsContainer
        header={<div>header</div>}
        padding
        width="10px"
        positionMenuTablet={0}
        positionMenuDesktop={150}
      >
        <Children />
      </TripsContainer>,
    );

    expect(wrapper.find("Header").exists()).toBe(true);
    expect(wrapper.find("Content").prop("padding")).toBe(true);
    expect(wrapper.find("Popup").prop("positionMenuTablet")).toEqual(0);
    expect(wrapper.find("Popup").prop("positionMenuDesktop")).toEqual(150);
  });
});
