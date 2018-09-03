// @flow strict
import * as rtl from "../rtl";
import { themeDefault } from "../../records/Theme";

const themePropsLtr = { theme: { ...themeDefault, rtl: false } };
const themePropsRtl = { theme: { ...themeDefault, rtl: true } };

describe("#rtl", () => {
  test("box - ltr", () => {
    expect(rtl.box("10px 20px 30px 40px")(themePropsLtr)).toBe("10px 20px 30px 40px");
  });
  test("box - rtl", () => {
    expect(rtl.box("10px 20px 30px 40px")(themePropsRtl)).toBe("10px 40px 30px 20px");
  });
  test("box - rtl, invalid input", () => {
    expect(rtl.box("10px 20px")(themePropsRtl)).toBe("10px 20px");
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
});
