// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";
import { mount } from "enzyme";

import TranslateNode from "..";

describe("#TranslateNode", () => {
  test("string", () => {
    const wrapper = mount(
      <TranslateNode t="lol __x__ kek bur" values={{ x: <strong>lmao</strong> }} />,
    );

    expect(wrapper.contains(<span />)).toBe(false);
    expect(wrapper.contains(<span dangerouslySetInnerHTML={{ __html: "lol " }} />)).toBe(true);
    expect(
      wrapper.contains(
        <span>
          <strong>lmao</strong>
        </span>,
      ),
    ).toBe(true);
    expect(wrapper.contains(<span dangerouslySetInnerHTML={{ __html: " kek bur" }} />)).toBe(true);
  });

  test("more values", () => {
    const wrapper = mount(
      <TranslateNode
        t="lol __x__ kek bur __y__"
        values={{ x: <strong>lmao</strong>, y: "rofl" }}
      />,
    );

    expect(wrapper.contains(<span />)).toBe(false);
    expect(wrapper.contains(<span dangerouslySetInnerHTML={{ __html: "lol " }} />)).toBe(true);
    expect(
      wrapper.contains(
        <span>
          <strong>lmao</strong>
        </span>,
      ),
    ).toBe(true);
    expect(wrapper.contains(<span dangerouslySetInnerHTML={{ __html: " kek bur " }} />)).toBe(true);
    expect(wrapper.contains(<span>rofl</span>)).toBe(true);
  });
});
