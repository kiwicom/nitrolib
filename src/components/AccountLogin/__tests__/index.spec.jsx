// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import AccountLogin from "..";

const commonProps = {
  email: "",
  brandName: "Kiwi.com",
  onEmailChange: () => {},
  onFacebookLogin: () => {},
  onGoogleLogin: () => {},
  onContinue: () => {},
};

describe("#AccountLogin", () => {
  test("render", () => {
    const wrapper = mount(<AccountLogin {...commonProps} />);

    expect(wrapper.find("Illustration").prop("name")).toBe("Login");
    expect(
      wrapper
        .find("Heading")
        .find("Translate")
        .prop("t"),
    ).toBe("account.manage_your_bookings");
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
