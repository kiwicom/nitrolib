// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountLogin from "..";

import { intlDefault } from "../../../records/Intl";

const commonProps = {
  email: "",
  brandName: "Kiwi.com",
  onNoAccount: () => {},
  onEmailChange: () => {},
  onFacebookLogin: () => {},
  onGoogleLogin: () => {},
  onContinue: () => {},
};

describe("#AccountLogin", () => {
  test("render", () => {
    const wrapper = shallow(<AccountLogin {...commonProps} />);

    // <span /> needed for some reason, but it works
    const wrapper2 = shallow(<span>{wrapper.prop("children")(intlDefault)}</span>);

    expect(wrapper2.find("Illustration").prop("name")).toBe("Login");
    expect(
      wrapper2
        .find("Heading")
        .children("Translate")
        .prop("t"),
    ).toBe("account.manage_your_bookings");
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
      const wrapper = shallow(<AccountLogin {...commonProps} type={type} />);

      const component = shallow(<span>{wrapper.prop("children")(intlDefault)}</span>);
      expect(component.find("Illustration").prop("name")).toBe(illustration);
      expect(
        component
          .find("Heading")
          .find("Translate")
          .prop("t"),
      ).toBe(title);
      expect(component.find(`[t="${description}"]`).exists()).toBe(true);
    }),
  );
});
