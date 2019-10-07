// @flow strict

import * as React from "react";
import { mount } from "enzyme";

import makeEnvironment from "../../../services/utils/relay";

import InitRelayEnvironment from "..";

jest.mock("../../../services/utils/relay");

describe("#InitRelayEnvironment", () => {
  it("initializes environment with correct headers", () => {
    mount(<InitRelayEnvironment clientID="TestClient">{null}</InitRelayEnvironment>);

    expect(makeEnvironment).toHaveBeenCalledWith(
      {
        "Accept-Language": "en-GB",
        "X-Client": "TestClient",
      },
      undefined,
    );
  });
});
