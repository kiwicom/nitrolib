// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import TailoredHeader from "..";

describe("#TailoredHeader", () => {
  [
    {
      type: "mmb",
      illustration: "Login",
      title: "account.manage_your_bookings",
    },
    {
      type: "help",
      illustration: "Help",
      title: "account.login_title.get_help",
    },
    {
      type: "refer",
      illustration: "ReferAFriend",
      title: "account.login_title.refer",
    },
  ].forEach(({ type, illustration, title }) =>
    test(`type ${type}`, () => {
      const wrapper = mount(<TailoredHeader type={type} />);

      expect(wrapper.find("Illustration").prop("name")).toBe(illustration);
      expect(wrapper.find("Heading").text()).toBe(title);
    }),
  );
});
