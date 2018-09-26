// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Starred from "..";

import ToggleLogger from "../../ToggleLogger";
import TripsContainer from "../../TripsContainer";

const onLog = jest.fn();
const onOpen = jest.fn();
const Children = () => "children";

describe("#Starred", () => {
  const component = shallow(
    <Starred onLog={onLog}>
      <ToggleLogger onOpen={onOpen}>
        {({ open, onToggle }) => (
          <div onToggle={onToggle} open={open}>
            <TripsContainer>
              <Children />
            </TripsContainer>
          </div>
        )}
      </ToggleLogger>
    </Starred>,
  );

  it("should match snapshot", () => {
    expect(
      component
        .dive()
        .dive()
        .shallow(),
    ).toMatchSnapshot();
  });
});
