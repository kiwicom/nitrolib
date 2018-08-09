// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import NativeGroupedSelect from "../index";

const items = [
  { value: "a", text: "one" },
  { value: "b", text: "two" },
  { value: "c", text: "three" },
  { value: "d", text: "four" },
];

describe("#NativeGroupedSelect", () => {
  test("render", () => {
    const wrapper = shallow(
      <NativeGroupedSelect value="a" groups={[{ key: "groupA", items }]} onChange={jest.fn()} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render - multiple groups", () => {
    const wrapper = shallow(
      <NativeGroupedSelect
        value="a"
        groups={[{ key: "groupA", items }, { key: "groupB", items }, { key: "groupC", items }]}
        onChange={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render - skip empty groups", () => {
    const wrapper = shallow(
      <NativeGroupedSelect
        value="a"
        groups={[{ key: "groupA", items }, { key: "groupB", items: [] }, { key: "groupC", items }]}
        onChange={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render - with icon", () => {
    const wrapper = shallow(
      <NativeGroupedSelect
        value="a"
        groups={[{ key: "groupA", items }]}
        onChange={jest.fn()}
        icon={<i>Icon</i>}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render - with custom divider", () => {
    const wrapper = shallow(
      <NativeGroupedSelect
        value="a"
        groups={[{ key: "groupA", items }, { key: "groupB", items }, { key: "groupC", items }]}
        divider="***"
        onChange={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("handle change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <NativeGroupedSelect
        value="a"
        groups={[{ key: "groupA", items }, { key: "groupB", items }, { key: "groupC", items }]}
        onChange={onChange}
      />,
    );

    wrapper.find("NativeGroupedSelect__Container").simulate("change", { target: { value: "c" } });

    expect(onChange).toBeCalledWith("c");
  });
});
