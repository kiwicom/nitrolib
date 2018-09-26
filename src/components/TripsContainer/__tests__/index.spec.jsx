// @flow
import * as React from "react";
import { shallow } from "enzyme";

import TripsContainer from "..";

const Children = () => "Children";

describe("#TripsContainer", () => {
  test("render", () => {
    const wrapper = shallow(
      <TripsContainer>
        <Children />
      </TripsContainer>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
