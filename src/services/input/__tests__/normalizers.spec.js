// @flow strict
import * as fns from "../normalizers";

describe("#normalizers", () => {
  test("numbers", () => {
    expect(fns.numbers("123s456")).toBe("123456");
  });

  test("phone: correct", () => {
    expect(fns.phone("+420774341623")).toBe("+420774341623");
  });

  test("phone: notcorrect", () => {
    expect(fns.phone(".#$*?:№420774341623")).toBe("420774341623");
  });
});
