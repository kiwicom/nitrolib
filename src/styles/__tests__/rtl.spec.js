// @flow strict
import * as rtl from "../rtl";
import { themeDefault } from "../../records/Theme";

const themePropsLtr = { theme: { ...themeDefault, rtl: false } };
const themePropsRtl = { theme: { ...themeDefault, rtl: true } };

describe("#rtl", () => {
  test("box - ltr", () => {
    expect(rtl.box(10, 20, 30, 40)(themePropsLtr)).toBe("10px 20px 30px 40px");
  });

  test("box - rtl", () => {
    expect(rtl.box(10, 20, 30, 40)(themePropsRtl)).toBe("10px 40px 30px 20px");
  });

  test("hOffset - ltr", () => {
    expect(rtl.hOffset(10)(themePropsLtr)).toBe(10);
  });

  test("hOffset - rtl", () => {
    expect(rtl.hOffset(10)(themePropsRtl)).toBe(-10);
  });

  test("left - ltr", () => {
    expect(rtl.left(themePropsLtr)).toBe("left");
  });

  test("left - rtl", () => {
    expect(rtl.left(themePropsRtl)).toBe("right");
  });

  test("right - ltr", () => {
    expect(rtl.right(themePropsLtr)).toBe("right");
  });

  test("right - rtl", () => {
    expect(rtl.right(themePropsRtl)).toBe("left");
  });

  test("translate3d - ltr", () => {
    expect(rtl.translate3d("1px", "2px", "3px")(themePropsLtr)).toBe("translate3d(1px, 2px, 3px)");
  });

  test("translate3d - rtl", () => {
    expect(rtl.translate3d("1px", "2px", "3px")(themePropsRtl)).toBe("translate3d(-1px, 2px, 3px)");
    expect(rtl.translate3d("-1px", "2px", "3px")(themePropsRtl)).toBe("translate3d(1px, 2px, 3px)");
  });
});
