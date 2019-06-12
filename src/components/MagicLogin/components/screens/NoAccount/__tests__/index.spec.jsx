// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import NoAccount from "..";

import { brandDefault } from "../../../../../../records/Brand";

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
    const registerLink = shallow(<span>{wrapper.prop("children")(brandDefault)}</span>).find(
      `[t="account.register"]`,
    );

    expect(registerLink.exists()).toBe(true);
  });
});
