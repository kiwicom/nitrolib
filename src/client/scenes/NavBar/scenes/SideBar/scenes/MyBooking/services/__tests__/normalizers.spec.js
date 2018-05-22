// @flow strict
import * as fns from "../normalizers";

describe("#normalizers", () => {
  test("numbers", () => {
    expect(fns.numbers("123s456")).toBe("123456");
  });
});
