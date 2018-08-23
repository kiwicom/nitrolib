// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import SideBar from "..";

describe("#SideBar", () => {
  test("render", () => {
    const wrapper = shallow(
      <SideBar
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        debug={<div>debug</div>}
        onSaveToken={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render with modal", () => {
    const wrapper = shallow(
      <SideBar
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveToken={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );

    wrapper.setState({ modalOpen: "myBooking" });

    expect(wrapper).toMatchSnapshot();
  });

  test("handle close", () => {
    const wrapper = shallow(
      <SideBar
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveToken={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );

    wrapper.setState({ modalOpen: "myBooking" });
    wrapper.instance().handleClose();

    expect(wrapper.state("modalOpen")).toBe("");
  });

  test("handle open my booking", () => {
    const wrapper = shallow(
      <SideBar
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveToken={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );

    wrapper.instance().handleOpenMyBooking();

    expect(wrapper.state("modalOpen")).toBe("myBooking");
  });

  test("handle open register", () => {
    const wrapper = shallow(
      <SideBar
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveToken={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );

    wrapper.instance().handleOpenRegister();

    expect(wrapper.state("modalOpen")).toBe("register");
  });

  test("handle open sign in", () => {
    const wrapper = shallow(
      <SideBar
        chat={<div>chat</div>}
        subscription={<div>subscription</div>}
        onSaveToken={jest.fn()}
        onSaveLanguage={jest.fn()}
      />,
    );

    wrapper.instance().handleOpenSignIn();

    expect(wrapper.state("modalOpen")).toBe("signIn");
  });
});
