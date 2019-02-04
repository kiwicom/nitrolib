// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Tooltip from "..";

describe("#Tooltip", () => {
  test("render - right", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="right">
        Content
      </Tooltip>,
    );

    expect(wrapper.find("Tooltip__Tip").prop("position")).toBe("right");
  });

  test("render - left", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="left">
        Content
      </Tooltip>,
    );

    expect(wrapper.find("Tooltip__Tip").prop("position")).toBe("left");
  });

  test("render - top", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="top">
        Content
      </Tooltip>,
    );

    expect(wrapper.find("Tooltip__Tip").prop("position")).toBe("top");
  });

  test("render - bottom", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="bottom">
        Content
      </Tooltip>,
    );

    expect(wrapper.find("Tooltip__Tip").prop("position")).toBe("bottom");
  });

  test("render - inline", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="right" inline>
        Content
      </Tooltip>,
    );

    expect(wrapper.find("Tooltip__Container").prop("inline")).toBe(true);
  });

  test("render - block", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="right">
        Content
      </Tooltip>,
    );

    expect(wrapper.find("Tooltip__Container").prop("inline")).toBe(false);
  });

  test("mouse over + out", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="right">
        Content
      </Tooltip>,
    );

    wrapper.find("Tooltip__Container").simulate("mouseover");
    expect(wrapper.state().shown).toBe(true);

    wrapper.find("Tooltip__Container").simulate("mouseout");
    expect(wrapper.state().shown).toBe(false);
  });
});
