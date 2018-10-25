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
        onResetError={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSelectTrip={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render with modal", () => {
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        portal=""
        onResetError={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSelectTrip={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );

    wrapper.setState({ modalOpen: "myBooking" });

    expect(wrapper).toMatchSnapshot();
  });

  test("render with forgot password modal", () => {
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        portal=""
        onResetError={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSelectTrip={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );

    wrapper.setState({ modalOpen: "forgotPassword" });

    expect(wrapper).toMatchSnapshot();
  });

  test("handle close", () => {
    const resetError = jest.fn();
    const setModal = jest.fn();
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        portal=""
        onResetError={resetError}
        onSaveLanguage={jest.fn()}
        onSelectTrip={jest.fn()}
        onSetModal={setModal}
      />,
    );

    wrapper.setState({ modalOpen: "myBooking" });
    wrapper.instance().handleClose();

    expect(wrapper.state("modalOpen")).toBe("");
    expect(resetError).toBeCalled();
    expect(setModal).toBeCalledWith("");
  });

  test("handle open my booking", () => {
    const setModal = jest.fn();
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        portal=""
        onResetError={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSelectTrip={jest.fn()}
        onSetModal={setModal}
      />,
    );

    wrapper.instance().handleOpenMyBooking();

    expect(wrapper.state("modalOpen")).toBe("myBooking");
    expect(setModal).toBeCalledWith("myBooking");
  });

  test("handle open register", () => {
    const setModal = jest.fn();
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        portal=""
        onResetError={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSelectTrip={jest.fn()}
        onSetModal={setModal}
      />,
    );

    wrapper.instance().handleOpenRegister();

    expect(wrapper.state("modalOpen")).toBe("register");
    expect(setModal).toBeCalledWith("register");
  });

  test("handle open sign in", () => {
    const setModal = jest.fn();
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        portal=""
        onResetError={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSelectTrip={jest.fn()}
        onSetModal={setModal}
      />,
    );

    wrapper.instance().handleOpenSignIn();

    expect(wrapper.state("modalOpen")).toBe("signIn");
    expect(setModal).toBeCalledWith("signIn");
  });

  test("handle open forgot password", () => {
    const setModal = jest.fn();
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        portal=""
        onResetError={jest.fn()}
        onSaveLanguage={jest.fn()}
        onSelectTrip={jest.fn()}
        onSetModal={setModal}
      />,
    );

    wrapper.instance().handleOpenForgotPassword();

    expect(wrapper.state("modalOpen")).toBe("forgotPassword");
    expect(setModal).toBeCalledWith("forgotPassword");
  });
});
