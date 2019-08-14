// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import PasswordLabelTranslation from "..";

describe("#PasswordLabelTranslation", () => {
  it("Shows correct translation for a given label", () => {
    const wrapper = mount(<PasswordLabelTranslation label="STRONG" />);

    expect(
      wrapper
        .find("Translate")
        .first()
        .text(),
    ).toEqual("account.password_validation.strength_label.strong");
  });
});
