import uuid from "uuid/v4";

import isUUID from "../isUUID";

describe("#UUIDv4", () => {
  test("if string is uuid v4", () => {
    expect(isUUID(uuid())).toBe(true);
  });

  test("uuid v3 should return false", () => {
    expect(isUUID("a3bb189e-8bf9-3888-9912-ace4e6543002")).toBe(false);
  });

  test("should return false", () => {
    expect(isUUID("kek")).toBe(false);
  });
});
