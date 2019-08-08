// @flow strict
import * as React from "react";
import { mount, shallow } from "enzyme";

import AccountLogin from "..";

const commonProps = {
  email: "",
  onEmailChange: () => {},
  onEmailBlur: () => {},
  onFacebookLogin: () => {},
  onGoogleLogin: () => {},
  onContinue: () => {},
  onIncorrectEmail: () => {},
};

describe("#AccountLogin", () => {
  test("render", () => {
    const wrapper = shallow(<AccountLogin {...commonProps} />);

    expect(
      wrapper
        .find("ModalHeader")
        .first()
        .prop("illustration").props.name,
    ).toBe("Login");
  });

  test("render error", () => {
    const wrapper = mount(<AccountLogin {...commonProps} error="Kek" />);

    expect(wrapper.find("Alert").prop("type")).toBe("critical");
  });

  [
    {
      type: "mmb",
      description: "account.sign_in_description",
      illustration: "Login",
      title: "account.manage_your_bookings",
    },
    {
      type: "help",
      description: "account.login_description.help",
      illustration: "Help",
      title: "account.login_title.get_help",
    },
    {
      type: "refer",
      description: "account.login_description.refer",
      illustration: "ReferAFriend",
      title: "account.login_title.refer",
    },
  ].forEach(({ type, description, illustration, title }) =>
    test(`type ${type}`, () => {
      const wrapper = mount(<AccountLogin {...commonProps} type={type} />);

      expect(wrapper.find("Illustration").prop("name")).toBe(illustration);
      expect(
        wrapper
          .find("Heading")
          .find("Translate")
          .prop("t"),
      ).toBe(title);
      expect(wrapper.find(`[t="${description}"]`).exists()).toBe(true);
    }),
  );
});
