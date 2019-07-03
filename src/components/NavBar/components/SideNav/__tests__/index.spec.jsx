// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import * as MODALS from "../../../../../consts/modals";

import SideNav from "..";

describe("#SideNav", () => {
  test("render", () => {
    const wrapper = shallow(
      <SideNav
        subscription={<div>subscription</div>}
        portal=""
        inverted={false}
        debug={<div>debug</div>}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );

    expect(wrapper.find("SideNav__MenuOpen").exists()).toBe(true);
  });

  test("opens when clicked", () => {
    const wrapper = shallow(
      <SideNav
        subscription={<div>subscription</div>}
        portal=""
        inverted={false}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );
    wrapper.instance().handleToggle();

    expect(wrapper.state("modalOpen")).toEqual(MODALS.SIDE_NAV);
  });

  test("opens subscription", () => {
    const setModal = jest.fn();
    const wrapper = shallow(
      <SideNav
        subscription={<div>subscription</div>}
        portal=""
        inverted={false}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSetModal={setModal}
      />,
    );

    wrapper.instance().handleOpenSubscription();

    expect(wrapper.state("modalOpen")).toBe("subscription");
    expect(setModal).toBeCalledTimes(1);
    expect(setModal).toBeCalledWith("subscription");
  });

  test("opens debug", () => {
    const setModal = jest.fn();
    const wrapper = shallow(
      <SideNav
        subscription={<div>subscription</div>}
        portal=""
        inverted={false}
        debug={<div>debug</div>}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSetModal={setModal}
      />,
    );

    wrapper.instance().handleOpenDebug();

    expect(wrapper.state("modalOpen")).toBe("debug");
    expect(setModal).toBeCalledTimes(1);
    expect(setModal).toBeCalledWith("debug");
  });

  test("calls handlers when toggles", () => {
    const setModal = jest.fn();
    const wrapper = shallow(
      <SideNav
        subscription={<div>subscription</div>}
        portal=""
        inverted={false}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSetModal={setModal}
      />,
    );
    wrapper.instance().handleToggle();

    expect(setModal).toBeCalledWith("sideNav");

    setModal.mockClear();

    wrapper.instance().handleToggle();

    expect(setModal).toBeCalledWith("");
  });
});
