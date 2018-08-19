// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import SideNav from "..";

describe("#SideNav", () => {
  test("render", () => {
    const wrapper = shallow(
      <SideNav
        onOpenChat={jest.fn()}
        onOpenSubscription={jest.fn()}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
        debug={false}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("opens when clicked", () => {
    const wrapper = shallow(
      <SideNav
        onOpenChat={jest.fn()}
        onOpenSubscription={jest.fn()}
        onOpenSignIn={jest.fn()}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
        debug={false}
      />,
    );
    wrapper.instance().handleToggle();

    expect(wrapper.state().shown).toEqual(true);
  });

  test("opens signin when clicked", () => {
    const signIn = jest.fn();
    const wrapper = shallow(
      <SideNav
        onOpenChat={jest.fn()}
        onOpenSubscription={jest.fn()}
        onOpenSignIn={signIn}
        onOpenRegister={jest.fn()}
        onSaveLanguage={jest.fn()}
        debug={false}
      />,
    );
    wrapper.instance().handleToggle();
    wrapper.instance().openSignIn();

    expect(signIn).toHaveBeenCalled();
  });

  test("opens register when clicked", () => {
    const register = jest.fn();
    const wrapper = shallow(
      <SideNav
        onOpenChat={jest.fn()}
        onOpenSubscription={jest.fn()}
        onOpenSignIn={jest.fn()}
        onOpenRegister={register}
        onSaveLanguage={jest.fn()}
        debug={false}
      />,
    );
    wrapper.instance().handleToggle();
    wrapper.instance().openRegister();

    expect(register).toHaveBeenCalled();
  });
});
