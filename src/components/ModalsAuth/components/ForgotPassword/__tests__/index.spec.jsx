// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import ForgotPassword from "../index";

describe("#SideBar/ForgotPassword", () => {
  test("render", () => {
    const wrapper = shallow(
      <ForgotPassword brandId="kiwicom" onClose={jest.fn()} resetPassword={jest.fn()} />,
    );

    expect(wrapper.find("ForgotPassword__Container").exists()).toBe(true);
  });

  test("render loading", () => {
    const wrapper = shallow(
      <ForgotPassword brandId="kiwicom" onClose={jest.fn()} resetPassword={jest.fn()} />,
    );

    wrapper.setState({ loading: true });

    expect(wrapper.state("loading")).toBe(true);
  });

  test("render submitted", () => {
    const wrapper = shallow(
      <ForgotPassword brandId="kiwicom" onClose={jest.fn()} resetPassword={jest.fn()} />,
    );

    wrapper.setState({ submitted: true });

    expect(wrapper.state("submitted")).toBe(true);
  });

  test("render error INVALID_ARGUMENT_LOGIN", () => {
    const wrapper = shallow(
      <ForgotPassword brandId="kiwicom" onClose={jest.fn()} resetPassword={jest.fn()} />,
    );

    const error = new Error();
    error.name = "INVALID_ARGUMENT_LOGIN";
    wrapper.setState({ error });

    expect(wrapper.find("AcceptAlert").exists()).toBe(true);
  });

  test("render error", () => {
    const wrapper = shallow(
      <ForgotPassword brandId="kiwicom" onClose={jest.fn()} resetPassword={jest.fn()} />,
    );

    wrapper.setState({ error: new Error() });

    expect(wrapper.state("error")).toEqual(new Error());
  });

  test("handle change", async () => {
    const wrapper = shallow(
      <ForgotPassword brandId="kiwicom" onClose={jest.fn()} resetPassword={jest.fn()} />,
    );

    wrapper.instance().setState({ submitted: true, error: new Error() });
    wrapper.instance().handleChange({ value: "value", error: "error" });

    expect(wrapper.state("submitted")).toBe(false);
    expect(wrapper.state("error")).toBe(null);
    expect(wrapper.state("email").value).toBe("value");
    expect(wrapper.state("email").error).toBe("error");
  });

  test("handle submit - loading", async () => {
    const resetPassword = jest.fn(() => Promise.resolve());

    const wrapper = shallow(
      <ForgotPassword brandId="kiwicom" onClose={jest.fn()} resetPassword={resetPassword} />,
    );

    wrapper.instance().setState({ loading: true });
    const ev = { preventDefault: jest.fn() };
    const result = wrapper.instance().handleSubmit(ev);

    expect(ev.preventDefault).toBeCalled();
    expect(resetPassword).not.toBeCalled();

    await result;

    expect(wrapper.state("loading")).toBe(true);
    expect(wrapper.state("submitted")).toBe(false);
    expect(wrapper.state("error")).toBe(null);
  });

  test("handle submit - invalid email", async () => {
    const resetPassword = jest.fn(() => Promise.resolve());

    const wrapper = shallow(
      <ForgotPassword brandId="kiwicom" onClose={jest.fn()} resetPassword={resetPassword} />,
    );

    wrapper.instance().setState({ email: { error: "invalid", value: "" } });
    const result = wrapper.instance().handleSubmit({ preventDefault: jest.fn() });

    expect(resetPassword).not.toBeCalled();

    await result;

    expect(wrapper.state("loading")).toBe(false);
    expect(wrapper.state("submitted")).toBe(false);
    expect(wrapper.state("error")).toBe(null);
  });

  test("handle submit - success", async () => {
    const resetPassword = jest.fn(() => Promise.resolve());

    const wrapper = shallow(
      <ForgotPassword brandId="kiwicom" onClose={jest.fn()} resetPassword={resetPassword} />,
    );

    wrapper.instance().setState({ email: { error: null, value: "test@kiwi.com" } });
    const result = wrapper.instance().handleSubmit({ preventDefault: jest.fn() });

    expect(wrapper.state("loading")).toBe(true);
    expect(resetPassword).toBeCalledWith("test@kiwi.com", "kiwicom");

    await result;

    expect(wrapper.state("loading")).toBe(false);
    expect(wrapper.state("submitted")).toBe(true);
    expect(wrapper.state("error")).toBe(null);
  });

  test("handle submit - error", async () => {
    const resetPassword = jest.fn(() => Promise.reject(new Error()));

    const wrapper = shallow(
      <ForgotPassword brandId="kiwicom" onClose={jest.fn()} resetPassword={resetPassword} />,
    );

    wrapper.instance().setState({ email: { error: null, value: "test@kiwi.com" } });
    const result = wrapper.instance().handleSubmit({ preventDefault: jest.fn() });

    expect(wrapper.state("loading")).toBe(true);
    expect(resetPassword).toBeCalledWith("test@kiwi.com", "kiwicom");

    await result;

    expect(wrapper.state("loading")).toBe(false);
    expect(wrapper.state("submitted")).toBe(false);
    expect(wrapper.state("error")).toBeInstanceOf(Error);
  });
});
