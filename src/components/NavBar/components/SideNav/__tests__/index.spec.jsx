// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import SideNav from "..";

import * as MODALS from "../../../../../consts/modals";

describe("#SideNav", () => {
  test("render", () => {
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        starred={<div>starred</div>}
        portal=""
        inverted={false}
        debug={<div>debug</div>}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onOpenFaq={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("opens when clicked", () => {
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        starred={<div>starred</div>}
        portal=""
        inverted={false}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onOpenFaq={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );
    wrapper.instance().handleToggle();

    expect(wrapper.state("modalOpen")).toEqual(MODALS.SIDE_NAV);
  });

  test("opens chat", () => {
    const setModal = jest.fn();
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        starred={<div>starred</div>}
        portal=""
        inverted={false}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onOpenFaq={jest.fn()}
        onSetModal={setModal}
      />,
    );

    wrapper.instance().handleOpenChat();

    expect(wrapper.state("modalOpen")).toBe("chat");
    expect(setModal).toBeCalledTimes(1);
    expect(setModal).toBeCalledWith("chat");
  });

  test("opens subscription", () => {
    const setModal = jest.fn();
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        starred={<div>starred</div>}
        portal=""
        inverted={false}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onOpenFaq={jest.fn()}
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
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        starred={<div>starred</div>}
        portal=""
        inverted={false}
        debug={<div>debug</div>}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onOpenFaq={jest.fn()}
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
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        starred={<div>starred</div>}
        portal=""
        inverted={false}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        onOpenFaq={jest.fn()}
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
