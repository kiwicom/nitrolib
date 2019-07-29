import { getBorderState } from "../border";

describe("#border", () => {
  test("border state error", () => {
    const res = getBorderState({
      active: false,
      visited: true,
      error: true,
      hint: false,
    });

    expect(res).toBe("error");
  });

  test("border state hint", () => {
    const res = getBorderState({
      active: false,
      visited: false,
      error: false,
      hint: true,
    });

    expect(res).toBe("hint");
  });

  test("border state success", () => {
    const res = getBorderState({
      active: false,
      visited: true,
      error: false,
      hint: false,
    });

    expect(res).toBe("success");
  });

  test("border state base", () => {
    const res = getBorderState({
      active: false,
      visited: false,
      error: false,
      hint: false,
    });

    expect(res).toBe("base");
  });
});
