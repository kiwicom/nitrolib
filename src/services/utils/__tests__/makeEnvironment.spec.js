// @flow strict
import { Environment } from "relay-runtime";

import makeEnvironment from "../../makeEnvironment";

describe("#makeEnvironment", () => {
  test("making a new one", () => {
    const res = makeEnvironment(jest.fn());

    expect(res instanceof Environment).toBe(true);
  });
});
