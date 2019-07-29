import * as React from "react";
import { shallow } from "enzyme";

import Logo from "..";

describe("#Logo", () => {
  test("check default Logo", () => {
    const wrapper = shallow(
      <Logo
        id="cheburek"
        languageId="ru"
        title="opa"
        poweredByKiwi={false}
        onClick={jest.fn()}
        redirectUrl="/guesswhosback"
      />,
    );
    expect(wrapper.find("Logo__LogoLinkStyled").exists()).toBe(true);
  });

  test("check kiwi.com logo", () => {
    const wrapper = shallow(
      <Logo
        id="kiwicom"
        languageId="ru"
        title="opa"
        poweredByKiwi
        onClick={jest.fn()}
        redirectUrl="/guesswhosback"
      />,
    );

    expect(wrapper.find("Logo__Link").exists()).toBe(true);
  });

  test("check src", () => {
    const wrapper = shallow(
      <Logo
        id="cheburek"
        languageId="ru"
        title="opa"
        poweredByKiwi
        onClick={jest.fn()}
        redirectUrl="/guesswhosback"
      />,
    );

    expect(wrapper.find("Logo__LogoStyled").prop("srcSet")).toBe(
      "https://images.kiwi.com/whitelabels/0x80/cheburek.png?v=1 2x",
    );
    expect(wrapper.find("Logo__LogoStyledMobile").prop("src")).toBe(
      "https://images.kiwi.com/whitelabels/0x40/cheburek-mobile.png?v=1",
    );
  });
});
