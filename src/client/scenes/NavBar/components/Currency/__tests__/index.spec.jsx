// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import makeEnvironment from "client/services/utils/makeEnvironment";
import Currency from "../index";

describe("#Currency", () => {
  test("render", async () => {
    const promise = Promise.resolve();
    const environment = makeEnvironment(() => promise);

    const wrapper = shallow(<Currency environment={environment} />);

    await promise;

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Index").shallow()).toMatchSnapshot();
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });

  test("handleToggle", async () => {
    const promise = Promise.resolve();
    const environment = makeEnvironment(() => promise);

    const wrapper = shallow(<Currency environment={environment} />);

    await promise;

    wrapper.instance().handleToggle();
    expect(wrapper.state("shown")).toBe(true);

    wrapper.instance().handleToggle();
    expect(wrapper.state("shown")).toBe(false);
  });

  test("hide", async () => {
    const promise = Promise.resolve();
    const environment = makeEnvironment(() => promise);

    const wrapper = shallow(<Currency environment={environment} />);

    await promise;

    wrapper.instance().handleToggle();

    wrapper.instance().hide();
    expect(wrapper.state("shown")).toBe(false);
  });
});
