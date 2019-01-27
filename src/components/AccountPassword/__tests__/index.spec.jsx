// @flow strict
import * as React from "react";
import Text from "@kiwicom/orbit-components/lib/Text";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import { mount } from "enzyme";

import AccountPassword from "..";

const defaultProps = {
  onAskSignInLink: () => {},
  onChangeEmail: () => {},
  onPasswordChange: () => {},
  onForgotPassword: () => {},
  onSignIn: () => {},
  password: "kek",
  email: "kek@bur.com",
};

describe("#AccountPassword", () => {
  test("render", () => {
    const wrapper = mount(<AccountPassword {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("form error", () => {
    const component = mount(
      <AccountPassword {...defaultProps} error={<Text>Something wrong</Text>} />,
    );

    expect(component.find(Alert).exists()).toBe(true);
  });
});
