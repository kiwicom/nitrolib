// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountCheckEmail from "..";

describe("#AccountCheckEmail", () => {
  [
    ["magicLink", "account.check_email_magic_link"],
    ["signUpConfirmation", "account.check_email_sign_up"],
    ["resetPassword", "account.you_will_recieve_password"],
  ].forEach(([reason, tKey]) =>
    test(`render - ${reason}`, () => {
      const wrapper = shallow(<AccountCheckEmail email="foo@bar.com" reason={reason} />);

      expect(wrapper.find("TranslateRef").prop("t")).toBe(tKey);
    }),
  );
});
