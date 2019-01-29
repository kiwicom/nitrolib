// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Title from "..";

describe("#Title", () => {
  it("should have outbound translation", () => {
    const wrapper = mount(
      <Title
        sourceName="Moscow"
        destinationName="Prague"
        type="oneWay"
        direction="outbound"
        duration={120}
      />,
    );
    expect(wrapper.find("Translate").prop("t")).toBe("result.outbound");
  });

  it("should have inbound translation", () => {
    const wrapper = mount(
      <Title
        sourceName="Prague"
        destinationName="Moscow"
        type="return"
        direction="inbound"
        duration={120}
      />,
    );
    expect(wrapper.find("Translate").prop("t")).toBe("result.inbound");
  });

  it("should have duration translation", () => {
    const wrapper = mount(
      <Title
        sourceName="Prague"
        destinationName="Moscow"
        type="return"
        direction="inbound"
        duration={120}
      />,
    );
    expect(wrapper.find("TranslateNode").prop("t")).toBe("common.duration");
  });
});
