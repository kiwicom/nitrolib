// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import SideNav from "..";

describe("#SideNav", () => {
  test("render", () => {
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        debug={<div>debug</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
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
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );
    wrapper.instance().handleToggle();

    expect(wrapper.state().shown).toEqual(true);
  });

  test("opens signin when clicked", () => {
    const signIn = jest.fn();
    const setModal = jest.fn();
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onOpenSignIn={signIn}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSetModal={setModal}
      />,
    );
    wrapper.instance().handleToggle();
    setModal.mockClear();
    wrapper.instance().handleOpenSignIn();

    expect(signIn).toHaveBeenCalled();
    expect(setModal).not.toBeCalled();
  });

  test("opens register when clicked", () => {
    const register = jest.fn();
    const setModal = jest.fn();
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={register}
        onSaveLanguage={jest.fn()}
        onSetModal={setModal}
      />,
    );
    wrapper.instance().handleToggle();
    setModal.mockClear();
    wrapper.instance().handleOpenRegister();

    expect(register).toHaveBeenCalled();
    expect(setModal).not.toBeCalled();
  });

  test("opens chat", () => {
    const setModal = jest.fn();
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
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
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
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
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        debug={<div>debug</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
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
    const sideNavChange = jest.fn();

    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSetModal={setModal}
        onSideNavChange={sideNavChange}
      />,
    );
    wrapper.instance().handleToggle();

    expect(setModal).toBeCalledWith("sideNav");
    expect(sideNavChange).toBeCalledWith(true);

    setModal.mockClear();
    sideNavChange.mockClear();

    wrapper.instance().handleToggle();

    expect(setModal).toBeCalledWith("");
    expect(sideNavChange).toBeCalledWith(false);
  });
});
