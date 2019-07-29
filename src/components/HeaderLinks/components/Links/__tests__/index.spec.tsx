import * as React from "react";
import { shallow } from "enzyme";

import { response } from "../../../__mocks__/api";

import Links from "..";

describe("Links", () => {
  test("Links component should render correctly", () => {
    const wrapper = shallow(<Links active="travel" inverted={false} services={response.items} />);

    expect(wrapper.find("Link").exists()).toBe(true);
  });
});
