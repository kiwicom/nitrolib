// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Links from "..";

import { response } from "../../../__mocks__/api";

describe("Links", () => {
  test("Links component should render correctly", () => {
    const wrapper = shallow(<Links active="travel" inverted={false} services={response.items} />);

    expect(wrapper.find("Link").exists()).toBe(true);
  });
});
