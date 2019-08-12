// @flow strict
import * as React from "react";
import Text from "@kiwicom/orbit-components/lib/Text";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import { mount } from "enzyme";

import TailoredHeader from "../../../TailoredHeader";

import Password from "..";

const defaultProps = {
  onAskSignInLink: () => {},
  onChangeEmail: () => {},
  onPasswordChange: () => {},
  onForgotPassword: () => {},
  onSignIn: () => {},
  password: "kek",
  email: "kek@bur.com",
  tailoredHeader: <TailoredHeader type="mmb" />,
};

describe("#Password", () => {
  test("render", () => {
    const wrapper = mount(<Password {...defaultProps} />);

    expect(wrapper.find(Alert).exists()).toBe(false);
  });

  test("form error", () => {
    const wrapper = mount(<Password {...defaultProps} error={<Text>Something wrong</Text>} />);

    expect(wrapper.find(Alert).exists()).toBe(true);
  });
});
