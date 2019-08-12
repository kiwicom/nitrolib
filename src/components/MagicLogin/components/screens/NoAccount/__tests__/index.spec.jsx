// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import NoAccount from "..";

describe("#NoAccount", () => {
  test("renders button to register", () => {
    const wrapper = shallow(
      <NoAccount
        onBack={() => {}}
        onRegister={() => {}}
        onFacebookLogin={() => {}}
        onGoogleLogin={() => {}}
      />,
    );

    expect(wrapper.find(`[t="account.register"]`).exists()).toBe(true);
  });
});
