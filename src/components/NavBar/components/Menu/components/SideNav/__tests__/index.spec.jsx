// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";

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
      />,
    );
    wrapper.instance().handleToggle();

    expect(wrapper.state().shown).toEqual(true);
  });

  test("opens signin when clicked", () => {
    const signIn = jest.fn();
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onOpenSignIn={signIn}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );
    wrapper.instance().handleToggle();
    wrapper.instance().handleOpenSignIn();

    expect(signIn).toHaveBeenCalled();
  });

  test("opens register when clicked", () => {
    const register = jest.fn();
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={register}
        onSaveLanguage={jest.fn()}
      />,
    );
    wrapper.instance().handleToggle();
    wrapper.instance().handleOpenRegister();

    expect(register).toHaveBeenCalled();
  });

  test("opens chat", () => {
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );

    wrapper.instance().handleOpenChat();

    expect(wrapper.state("modalOpen")).toBe("chat");
  });

  test("opens subscription", () => {
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );

    wrapper.instance().handleOpenSubscription();

    expect(wrapper.state("modalOpen")).toBe("subscription");
  });

  test("opens debug", () => {
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        debug={<div>debug</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );

    wrapper.instance().handleOpenDebug();

    expect(wrapper.state("modalOpen")).toBe("debug");
  });

  test("toggles sidenav body class", () => {
    // $FlowExpected
    const wrapper = mount(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        debug={<div>debug</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );

    const body = document.querySelector("body");
    const instance = wrapper.instance();

    instance.handleToggle();
    expect(body && body.classList.contains("sidenav-opened")).toBe(true);

    instance.handleToggle();
    expect(body && body.classList.contains("sidenav-opened")).toBe(false);

    wrapper.unmount();
  });

  test("toggles sidenav body class", () => {
    const sideNavChange = jest.fn();

    // $FlowExpected
    const wrapper = shallow(
      <SideNav
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        debug={<div>debug</div>}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSideNavChange={sideNavChange}
      />,
    );

    const instance = wrapper.instance();

    instance.handleToggle();
    expect(sideNavChange).toHaveBeenCalledWith(true);

    instance.handleToggle();
    expect(sideNavChange).toHaveBeenCalledWith(false);
  });
});
