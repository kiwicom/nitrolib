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
        onSaveLanguage={jest.fn()}
        onLog={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render with modal", () => {
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveLanguage={jest.fn()}
        onLog={jest.fn()}
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
        onSaveLanguage={jest.fn()}
        onLog={jest.fn()}
      />,
    );

    wrapper.setState({ modalOpen: "forgotPassword" });

    expect(wrapper).toMatchSnapshot();
  });

  test("handle close", () => {
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveLanguage={jest.fn()}
        onLog={jest.fn()}
      />,
    );

    wrapper.setState({ modalOpen: "myBooking" });
    wrapper.instance().handleClose();

    expect(wrapper.state("modalOpen")).toBe("");
  });

  test("handle open my booking", () => {
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveLanguage={jest.fn()}
        onLog={jest.fn()}
      />,
    );

    wrapper.instance().handleOpenMyBooking();

    expect(wrapper.state("modalOpen")).toBe("myBooking");
  });

  test("handle open register", () => {
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveLanguage={jest.fn()}
        onLog={jest.fn()}
      />,
    );

    wrapper.instance().handleOpenRegister();

    expect(wrapper.state("modalOpen")).toBe("register");
  });

  test("handle open sign in", () => {
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveLanguage={jest.fn()}
        onLog={jest.fn()}
      />,
    );

    wrapper.instance().handleOpenSignIn();

    expect(wrapper.state("modalOpen")).toBe("signIn");
  });

  test("handle open forgot password", () => {
    const wrapper = shallow(
      <Menu
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveLanguage={jest.fn()}
        onLog={jest.fn()}
      />,
    );

    wrapper.instance().handleOpenForgotPassword();

    expect(wrapper.state("modalOpen")).toBe("forgotPassword");
  });
});
