// @flow strict
import isEmptish from "../isEmptish";

describe("#isEmptish", () => {
  test("regular object", () => {
    expect(isEmptish({ lol: "kek" })).toBe(false);
  });

  test("emptish object", () => {
    expect(isEmptish({ lol: "" })).toBe(true);
  });
});
