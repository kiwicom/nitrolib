// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Menu from "..";

describe("#Menu", () => {
  test("render", () => {
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        debug={<div>debug</div>}
        portal=""
        inverted={false}
        onSaveLanguage={jest.fn()}
        onSelectTrip={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
