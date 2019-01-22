// @flow strict
import format from "date-fns/format";

import { fixDateFormat } from "../LangInfo";

const formats = [
  { input: "ddd DD.MM.", want: "Mon 01.02." },
  { input: "D/M", want: "1/2" },
  { input: "DD.MM.YYYY", want: "01.02.2021" },
  { input: "L", want: "2" },
  { input: "ddd MMM D", want: "Mon Feb 1" },
  { input: "DD/MM/YYYY", want: "01/02/2021" },
  { input: "ddd, D.M.", want: "Mon, 1.2." },
  { input: "D.M.", want: "1.2." },
  { input: "ddd DD MMM", want: "Mon 01 Feb" },
  { input: "DD-MM-YYYY", want: "01-02-2021" },
  { input: "ddd D.M.", want: "Mon 1.2." },
  { input: "YYYY-MM-DD", want: "2021-02-01" },
  { input: "ddd D MMM", want: "Mon 1 Feb" },
  { input: "MM/DD/YYYY", want: "02/01/2021" },
  { input: "ddd DD/MM", want: "Mon 01/02" },
  { input: "ddd DD-MM", want: "Mon 01-02" },
  { input: "YYYY/MM/DD", want: "2021/02/01" },
  { input: "M/D", want: "2/1" },
  { input: "MMMD日(dd)", want: "Feb1日(01)" },
  { input: "YYYY年MM月DD日", want: "2021年02月01日" },
  { input: "ddd, MMM D", want: "Mon, Feb 1" },
  { input: "YYYY.MM.DD", want: "2021.02.01" },
  { input: "ddd, DD/MM", want: "Mon, 01/02" },
  { input: "ddd D. M.", want: "Mon 1. 2." },
];

describe("#LangInfo", () => {
  test("fixDateFormat - 'ddd' -> 'eee'", () => {
    const date = "ddd D MMM";
    expect(fixDateFormat(date)).toBe("eee d MMM");
  });

  test("fixDateFormat - 'D' -> 'd'", () => {
    const date = "D D D D D";
    expect(fixDateFormat(date)).toBe("d d d d d");
  });

  test("fixDateFormat - 'YYYY -> 'yyyy'", () => {
    const date = "YYYY yyy YY Y Y";
    expect(fixDateFormat(date)).toBe("yyyy yyy YY Y Y");
  });

  test("fixDateFormat - 'DD' -> 'dd'", () => {
    const date = "DD DDD DD DD DDDD";
    expect(fixDateFormat(date)).toBe("dd DDD dd dd DDDD");
  });

  formats.forEach(f => {
    const date = new Date(2021, 1, 1);

    test(`format - ${f.input} -> ${fixDateFormat(f.input)}`, () => {
      expect(format(date, fixDateFormat(f.input))).toBe(f.want);
    });
  });
});
