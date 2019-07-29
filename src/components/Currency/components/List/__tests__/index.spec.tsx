import * as React from "react";
import { shallow, mount } from "enzyme";
import { css } from "styled-components";

import currencies from "../../../../../records/__mocks__/Currencies";
import { themeDefault } from "../../../../../records/Theme";
import Code from "../../../primitives/Code";
import Name from "../../../primitives/Name";
import Sign from "../../../primitives/Sign";

import List from "..";

const active = currencies.eur;

const list = [currencies.gbp, currencies.eur, currencies.czk, currencies.usd];

describe("#Currency/List", () => {
  test("render", () => {
    const wrapper = mount(<List active={active} list={list} onSetCurrency={jest.fn()} />);

    const ItemText = wrapper
      .find(`[data-test='Currency-Item-${currencies.gbp.id}']`)
      .find("List__ItemText");
    expect(ItemText).toHaveStyleRule("background", "transparent");
    expect(ItemText).toHaveStyleRule("background", themeDefault.orbit.paletteCloudNormal, {
      modifier: ":hover",
    });
    expect(ItemText).toHaveStyleRule("color", themeDefault.orbit.paletteInkNormal, {
      modifier: css`
        ${Code}
      `,
    });
    expect(ItemText).toHaveStyleRule("color", themeDefault.orbit.paletteInkNormal, {
      modifier: css`
        ${Name}
      `,
    });
    expect(ItemText).toHaveStyleRule("color", themeDefault.orbit.paletteInkNormal, {
      modifier: css`
        ${Sign}
      `,
    });
  });

  test("render active", () => {
    const wrapper = mount(<List active={active} list={list} onSetCurrency={jest.fn()} />);

    const ItemText = wrapper
      .find(`[data-test='Currency-Item-${active.id}']`)
      .find("List__ItemText");
    expect(ItemText).toHaveStyleRule("background", themeDefault.orbit.paletteProductNormal);
    expect(ItemText).toHaveStyleRule("background", themeDefault.orbit.paletteProductNormal, {
      modifier: ":hover",
    });
    expect(ItemText).toHaveStyleRule("color", themeDefault.orbit.paletteWhite, {
      modifier: css`
        ${Code}
      `,
    });
    expect(ItemText).toHaveStyleRule("color", themeDefault.orbit.paletteWhite, {
      modifier: css`
        ${Name}
      `,
    });
    expect(ItemText).toHaveStyleRule("color", themeDefault.orbit.paletteWhite, {
      modifier: css`
        ${Sign}
      `,
    });
  });

  test("single active item", () => {
    const wrapper = shallow(<List active={active} list={list} onSetCurrency={jest.fn()} />);

    expect(wrapper.find("List__ItemText").filter("[active=true]").length).toBe(1);
    expect(
      wrapper
        .find(`[data-test='Currency-Item-${currencies.eur.id}']`)
        .find("List__ItemText")
        .prop("active"),
    ).toBe(true);
  });

  test("handle click", () => {
    const onSetCurrency = jest.fn();
    const wrapper = shallow(<List active={active} list={list} onSetCurrency={onSetCurrency} />);

    wrapper
      .find(`[data-test='Currency-Item-${currencies.gbp.id}']`)
      .find("List__ItemText")
      .simulate("click");

    expect(onSetCurrency).toBeCalledWith(currencies.gbp.id);
  });
});
