// @flow strict
import * as React from "react";
import Text from "@kiwicom/orbit-components/lib/Text";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import { shallow } from "enzyme";

import AccountPassword from "..";

import { intlDefault } from "../../../records/Intl";

const defaultProps = {
  onAskSignInLink: () => {},
  onChangeEmail: () => {},
  onPasswordChange: () => {},
  onForgotPassword: () => {},
  onSignIn: () => {},
  password: "kek",
  email: "kek@bur.com",
  brandName: "Kiwi.com",
};

describe("#AccountPassword", () => {
  test("render", () => {
    const wrapper = shallow(<AccountPassword {...defaultProps} />);

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });

  test("form error", () => {
    const wrapper = shallow(
      <AccountPassword {...defaultProps} error={<Text>Something wrong</Text>} />,
    );
    const component = shallow(<span>{wrapper.prop("children")(intlDefault)}</span>);

    expect(component.find(Alert).exists()).toBe(true);
  });
});
