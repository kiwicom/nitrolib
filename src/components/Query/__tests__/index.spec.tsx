import * as React from "react";
import { mount } from "enzyme";

import Query from "..";

describe("#Query", () => {
  test("no query", () => {
    const onMount = jest.fn();
    const wrapper = mount(<Query query= onMount={onMount} />);

    expect(wrapper.isEmptyRender()).toBe(true);
    expect(onMount).toBeCalledWith({});
  });

  test("query", () => {
    const onMount = jest.fn();
    const wrapper = mount(<Query query="?first_name=Lol&last_name=Kek" onMount={onMount} />);

    expect(wrapper.isEmptyRender()).toBe(true);
    expect(onMount).toBeCalledWith({ first_name: "Lol", last_name: "Kek" });
  });
});
