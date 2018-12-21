// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountLogin from "..";

import { intlDefault } from "../../../records/Intl";

describe("#AccountLogin", () => {
  test("render", () => {
    const wrapper = shallow(
      <AccountLogin
        email=""
        onNoAccount={() => {}}
        onEmailChange={() => {}}
        onFacebookLogin={() => {}}
        onGoogleLogin={() => {}}
        onContinue={() => {}}
      />,
    );

    // <span /> needed for some reason, but it works
    const wrapper2 = shallow(<span>{wrapper.prop("children")(intlDefault)}</span>);

    expect(wrapper2.find("Illustration").prop("name")).toBe("Login");
  });

  test("render custom illustration", () => {
    const wrapper = shallow(
      <AccountLogin
        email=""
        illustration="Help"
        onNoAccount={() => {}}
        onEmailChange={() => {}}
        onFacebookLogin={() => {}}
        onGoogleLogin={() => {}}
        onContinue={() => {}}
      />,
    );

    // <span /> needed for some reason, but it works
    const wrapper2 = shallow(<span>{wrapper.prop("children")(intlDefault)}</span>);

    expect(wrapper2.find("Illustration").prop("name")).toBe("Help");
  });

  test("render custom text", () => {
    const wrapper = shallow(
      <AccountLogin
        email=""
        text={<span className="Text">Kek</span>}
        onNoAccount={() => {}}
        onEmailChange={() => {}}
        onFacebookLogin={() => {}}
        onGoogleLogin={() => {}}
        onContinue={() => {}}
      />,
    );

    // <span /> needed for some reason, but it works
    const wrapper2 = shallow(<span>{wrapper.prop("children")(intlDefault)}</span>);

    expect(
      wrapper2
        .find("Heading")
        .children(".Text")
        .text(),
    ).toBe("Kek");
  });
});
