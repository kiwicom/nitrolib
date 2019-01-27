// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountNoAccount from "..";

import { brandDefault } from "../../../records/Brand";

describe("#AccountNoAccount", () => {
  test("render", () => {
    const wrapper = shallow(
      <AccountNoAccount
        onBack={() => {}}
        onRegister={() => {}}
        onFacebookLogin={() => {}}
        onGoogleLogin={() => {}}
      />,
    );

    expect(shallow(<span>{wrapper.prop("children")(brandDefault)}</span>)).toMatchSnapshot();
  });
});
