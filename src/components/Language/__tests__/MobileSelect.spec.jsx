// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import MobileSelect from "../MobileSelect";
import { langInfoDefault } from "../../../records/LangInfo";
import { brandLanguageDefault } from "../../../records/BrandLanguage";

describe("#MobileSelect", () => {
  test("render", () => {
    const wrapper = shallow(
      <MobileSelect
        current={langInfoDefault}
        languages={[brandLanguageDefault.languages.en]}
        onChange={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("on change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <MobileSelect
        current={langInfoDefault}
        languages={[brandLanguageDefault.languages.en]}
        onChange={onChange}
      />,
    );

    wrapper.find("MobileSelect__NativeSelect").simulate("change", { target: { value: "kek" } });

    expect(onChange).toBeCalledWith("kek");
  });
});
