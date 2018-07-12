// @flow strict
import { getBorderState } from "../../border";

describe("#border", () => {
  test("border state error", () => {
    const res = getBorderState({
      active: false,
      visited: true,
      error: true,
    });

    expect(res).toBe("error");
  });

  test("border state success", () => {
    const res = getBorderState({
      active: false,
      visited: true,
      error: false,
    });

    expect(res).toBe("success");
  });

  test("border state base", () => {
    const res = getBorderState({
      active: false,
      visited: false,
      error: false,
    });

    expect(res).toBe("base");
  });
});
