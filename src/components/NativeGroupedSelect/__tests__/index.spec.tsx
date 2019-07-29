import * as React from "react";
import { shallow } from "enzyme";

import NativeGroupedSelect from "..";

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

    expect(wrapper.find("NativeGroupedSelect__Container").exists()).toBe(true);
  });

  test("render - multiple groups", () => {
    const wrapper = shallow(
      <NativeGroupedSelect
        value="a"
        groups={[{ key: "groupA", items }, { key: "groupB", items }, { key: "groupC", items }]}
        onChange={jest.fn()}
      />,
    );

    expect(
      wrapper
        .find("optgroup")
        .at(0)
        .exists(),
    ).toBe(true);

    expect(
      wrapper
        .find("optgroup")
        .at(1)
        .exists(),
    ).toBe(true);

    expect(
      wrapper
        .find("optgroup")
        .at(2)
        .exists(),
    ).toBe(true);
  });

  test("render - skip empty groups", () => {
    const wrapper = shallow(
      <NativeGroupedSelect
        value="a"
        groups={[{ key: "groupA", items }, { key: "groupB", items: [] }, { key: "groupC", items }]}
        onChange={jest.fn()}
      />,
    );

    expect(
      wrapper
        .find("optgroup")
        .at(0)
        .key(),
    ).toBe("groupA");

    expect(
      wrapper
        .find("optgroup")
        .at(1)
        .key(),
    ).toBe("groupC");
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

    expect(wrapper.find("NativeGroupedSelect__IconContainer").exists()).toBe(true);
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

    expect(
      wrapper
        .find("optgroup")
        .at(1)
        .prop("label"),
    ).toBe("***");
  });

  test("render - with hidden text", () => {
    const wrapper = shallow(
      <NativeGroupedSelect
        value="a"
        groups={[{ key: "groupA", items }]}
        onChange={jest.fn()}
        icon={<i>Icon</i>}
        hideNativeText
      />,
    );

    expect(wrapper.find("NativeGroupedSelect__Select").prop("hideNativeText")).toBe(true);
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

    wrapper.find("NativeGroupedSelect__Select").simulate("change", { target: { value: "c" } });

    expect(onChange).toBeCalledWith("c");
  });
});
