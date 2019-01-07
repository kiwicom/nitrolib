// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";
import { mount } from "enzyme";

import Translate from "..";

import { Provider } from "../../../services/intl/context";
import { intlDefault } from "../../../records/Intl";

describe("#Translate", () => {
  test("translate call", () => {
    const translate = jest.fn().mockImplementation(() => "lmao");
    const wrapper = mount(
      <Provider
        value={{
          ...intlDefault,
          translate,
        }}
      >
        <Translate t="lol" values={{ kek: "bur" }} />
      </Provider>,
    );

    expect(translate).toBeCalledWith("lol", { kek: "bur" });
    expect(wrapper.contains("lmao")).toBe(true);
  });

  test("string", () => {
    const wrapper = mount(<Translate t="lol" />);

    expect(wrapper.contains("lol")).toBe(true);
  });

  test("html", () => {
    const wrapper = mount(<Translate t="lol" html />);

    expect(wrapper.contains(<span dangerouslySetInnerHTML={{ __html: "lol" }} />)).toBe(true);
  });
});
