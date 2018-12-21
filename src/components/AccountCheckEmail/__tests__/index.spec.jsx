// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountCheckEmail from "..";

describe("#AccountCheckEmail", () => {
  test("render - magicLink", () => {
    const wrapper = shallow(<AccountCheckEmail email="foo@bar.com" reason="magicLink" />);

    expect(
      wrapper
        .find("Text")
        .children("Translate")
        .prop("t"),
    ).toBe("account.check_email_magic_link");
  });

  test("render - signUpConfirmation", () => {
    const wrapper = shallow(<AccountCheckEmail email="bar@foo.com" reason="signUpConfirmation" />);

    expect(
      wrapper
        .find("Text")
        .children("Translate")
        .prop("t"),
    ).toBe("account.check_email_sign_up");
  });
});
