// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import makeEnvironment from "client/services/utils/makeEnvironment";
import Currency from "../index";

const res = {
  data: {
    currencies: {
      edges: [
        {
          node: {
            id: "eur",
            code: "eur",
            name: "Euro",
            format: "__price__ $",
          },
        },
      ],
    },
    geoIP: {
      isoCountryCode: "GB",
    },
  },
};

describe("#Currency", () => {
  test("render", async () => {
    const promise = Promise.resolve(res);
    const environment = makeEnvironment(() => promise);

    const wrapper = shallow(<Currency environment={environment} />);

    await promise;

    expect(wrapper.dive()).toMatchSnapshot();
  });

  test("handle toggle", async () => {
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

    wrapper.instance().handleHide();
    expect(wrapper.state("shown")).toBe(false);
  });
});
