// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Tooltip from "..";

describe("#Tooltip", () => {
  test("render - right", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="right" color="#00FF00">
        Content
      </Tooltip>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();
    expect(wrapper.find("Tooltip__TipContent").shallow()).toMatchSnapshot();
  });

  test("render - left", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="left">
        Content
      </Tooltip>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();
  });

  test("render - top", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="top">
        Content
      </Tooltip>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();
  });

  test("render - bottom", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="bottom">
        Content
      </Tooltip>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();
  });

  test("render - moved", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="bottom" moveArrow={20} moveContent={-40}>
        Content
      </Tooltip>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();
  });

  test("render - inline", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="right" inline>
        Content
      </Tooltip>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Container").shallow()).toMatchSnapshot();
  });

  test("render - block", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="right">
        Content
      </Tooltip>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Container").shallow()).toMatchSnapshot();
  });

  test("disabled", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="right" disabled>
        Content
      </Tooltip>,
    );

    wrapper.find("Tooltip__Container").simulate("mouseover");
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();

    wrapper.find("Tooltip__Container").simulate("mouseout");
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();
  });

  test("mouse over + out", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="right">
        Content
      </Tooltip>,
    );

    wrapper.find("Tooltip__Container").simulate("mouseover");
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();

    wrapper.find("Tooltip__Container").simulate("mouseout");
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();
  });

  test("alwaysOn", () => {
    const wrapper = shallow(
      <Tooltip tip="Tip" position="right" alwaysOn>
        Content
      </Tooltip>,
    );

    wrapper.find("Tooltip__Container").simulate("mouseover");
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();

    wrapper.find("Tooltip__Container").simulate("mouseout");
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tooltip__Tip").shallow()).toMatchSnapshot();
  });
});
