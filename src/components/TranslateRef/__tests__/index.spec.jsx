// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";
import { mount } from "enzyme";

import TranslateRef from "..";

import { Provider } from "../../../services/intl/context";
import { intlDefault } from "../../../records/Intl";

describe("#TranslateRef", () => {
  test("translate call", () => {
    const translate = jest.fn().mockImplementation(() => "lmao");
    const wrapper = mount(
      <Provider
        value={{
          ...intlDefault,
          translate,
          onDebug: jest.fn(),
        }}
      >
        <TranslateRef t="lol" values={{ kek: "bur" }} render={() => null} />
      </Provider>,
    );

    expect(translate).toBeCalledWith("lol", { kek: "bur" });
    expect(wrapper.contains(<span dangerouslySetInnerHTML={{ __html: "lmao" }} />)).toBe(true);
  });

  test("string", () => {
    const render = jest.fn().mockReturnValue(<b>lmao</b>);
    const wrapper = mount(<TranslateRef t="lol <ref>x</ref> kek bur" render={render} />);

    expect(wrapper.contains(<span />)).toBe(false);
    expect(wrapper.contains(<span dangerouslySetInnerHTML={{ __html: "lol " }} />)).toBe(true);
    expect(wrapper.contains(<b>lmao</b>)).toBe(true);
    expect(wrapper.contains(<span dangerouslySetInnerHTML={{ __html: " kek bur" }} />)).toBe(true);
  });
});
