// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import TranslateToolTips from "..";

describe("TranslateToolTips", () => {
  it("should return translation for outbound tooltip", () => {
    const component = mount(
      <TranslateToolTips arrivalName="kek" departureName="bur" highlight>
        Kekistan
      </TranslateToolTips>,
    );

    expect(component.find("Translate").prop("t")).toEqual("common.different_airport_return");
  });

  it("should return translation for inbound tooltip", () => {
    const component = mount(
      <TranslateToolTips arrivalName="kek" departureName="bur" returnTrip highlight>
        Kekistan
      </TranslateToolTips>,
    );

    expect(component.find("Translate").prop("t")).toEqual("common.different_airport_return_first");
  });
});
