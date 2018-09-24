// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { langInfoDefault } from "../../../records/LangInfo";
import { brandLanguageDefault } from "../../../records/BrandLanguage";
import NativePicker from "../NativePicker";

describe("#Language/NativePicker", () => {
  test("render", () => {
    const wrapper = shallow(
      <NativePicker
        current={langInfoDefault}
        languages={[brandLanguageDefault.languages.en]}
        onChange={jest.fn()}
        onOpen={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
