// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import SideBar from "../index";

describe("#SideBar", () => {
  test("render", () => {
    const wrapper = shallow(<SideBar />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render with modal", () => {
    const wrapper = shallow(<SideBar />);

    wrapper.setState({ modalOpen: "myBooking" });

    expect(wrapper).toMatchSnapshot();
  });

  test("handle close", () => {
    const wrapper = shallow(<SideBar />);

    wrapper.setState({ modalOpen: "myBooking" });
    wrapper.instance().handleClose();

    expect(wrapper.state("modalOpen")).toBe("");
  });

  test("handle open my booking", () => {
    const wrapper = shallow(<SideBar />);

    wrapper.instance().handleOpenMyBooking();

    expect(wrapper.state("modalOpen")).toBe("myBooking");
  });

  test("handle open register", () => {
    const wrapper = shallow(<SideBar />);

    wrapper.instance().handleOpenRegister();

    expect(wrapper.state("modalOpen")).toBe("register");
  });

  test("handle open sign in", () => {
    const wrapper = shallow(<SideBar />);

    wrapper.instance().handleOpenSignIn();

    expect(wrapper.state("modalOpen")).toBe("signIn");
  });
});
