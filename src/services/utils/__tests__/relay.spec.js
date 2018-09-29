// @flow strict
import { Environment } from "relay-runtime";

import { makeEnvironment } from "../relay";

describe("#relay", () => {
  test("make environment", () => {
    const res = makeEnvironment(jest.fn());

    expect(res instanceof Environment).toBe(true);
  });
});
