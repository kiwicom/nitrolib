// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import LanguageFlag from "../LanguageFlag";

describe("#Language/LanguageFlag", () => {
  test("render", () => {
    const wrapper = shallow(<LanguageFlag flagId="gb" />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render with scale", () => {
    const wrapper = shallow(<LanguageFlag flagId="gb" scale={0.5} />);

    expect(wrapper).toMatchSnapshot();
  });
});
