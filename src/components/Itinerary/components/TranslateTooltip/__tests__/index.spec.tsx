import * as React from "react";
import { mount } from "enzyme";

import TranslateToolTips from "..";

describe("TranslateToolTips", () => {
  it("should have highlight", () => {
    const component = mount(
      <TranslateToolTips arrivalName="kek" departureName="bur" returnTrip highlight>
        Kekistan
      </TranslateToolTips>,
    );

    expect(component.find("Tooltip").exists()).toBe(true);
  });
});
