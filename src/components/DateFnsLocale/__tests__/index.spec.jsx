// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import enUS from "date-fns/locale/en-US"; // fallback

import DateFnsLocale from "../index";

describe("#DateFnsLocale", () => {
  test("render", async () => {
    const thing = {};
    const child = jest.fn().mockImplementation(() => <h1>kek</h1>);
    const getLocale = Promise.resolve(thing);
    const wrapper = shallow(<DateFnsLocale getLocale={getLocale}>{child}</DateFnsLocale>);

    expect(wrapper.isEmptyRender()).toBe(true);
    await getLocale;

    expect(child).toBeCalledWith(thing);
    expect(wrapper.contains(<h1>kek</h1>)).toBe(true);
  });

  test("render default on error", async () => {
    const child = jest.fn().mockImplementation(() => <h1>kek</h1>);
    const getLocale = Promise.reject(new Error("dick"));
    const wrapper = shallow(<DateFnsLocale getLocale={getLocale}>{child}</DateFnsLocale>);

    expect(wrapper.isEmptyRender()).toBe(true);
    await getLocale.catch(() => {});

    expect(child).toBeCalledWith(enUS);
    expect(wrapper.contains(<h1>kek</h1>)).toBe(true);
  });
});
