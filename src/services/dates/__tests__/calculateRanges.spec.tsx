import getDaysInMonth from "date-fns/getDaysInMonth";
import * as R from "ramda";

import calculateRanges, {
  getMinDate,
  getMaxDate,
  getMinMonth,
  getMaxMonth,
} from "../calculateRanges";

describe("#calculateRanges", () => {
  describe("getMinDate", () => {
    const min = new Date(2010, 1, 3);
    const date1 = new Date(2010, 1, 2);

    it("should return min date", () => {
      expect(getMinDate(min, date1)).toBe(3);
    });

    const date2 = new Date(2010, 2, 4);
    const date3 = new Date(2011, 1, 4);
    const date4 = new Date(2011, 2, 4);

    it("should return 1, later month and year", () => {
      expect(getMinDate(min, date2)).toBe(1);
      expect(getMinDate(min, date3)).toBe(1);
      expect(getMinDate(min, date4)).toBe(1);
    });
  });

  describe("getMaxDate", () => {
    const max = new Date(2010, 8, 13);
    const date1 = new Date(2010, 8, 17);

    it("should return max date", () => {
      expect(getMaxDate(max, date1)).toBe(13);
    });

    const date2 = new Date(2010, 7, 4);
    const date3 = new Date(2009, 8, 4);
    const date4 = new Date(2009, 7, 4);

    it("should return 1, later month and year", () => {
      expect(getMaxDate(max, date2)).toBe(getDaysInMonth(date2));
      expect(getMaxDate(max, date3)).toBe(getDaysInMonth(date3));
      expect(getMaxDate(max, date4)).toBe(getDaysInMonth(date4));
    });
  });

  describe("getMinMonth", () => {
    const min = new Date(2010, 2, 1);
    const date1 = new Date(2010, 1, 2);

    it("should return min month", () => {
      expect(getMinMonth(min, date1)).toBe(2);
    });

    const date2 = new Date(2011, 2, 4);
    const date3 = new Date(2011, 3, 4);
    const date4 = new Date(2011, 1, 4);

    it("should return 0 (january), later year", () => {
      expect(getMinMonth(min, date2)).toBe(0);
      expect(getMinMonth(min, date3)).toBe(0);
      expect(getMinMonth(min, date4)).toBe(0);
    });
  });

  describe("getMaxMonth", () => {
    const max = new Date(2010, 8, 13);
    const date1 = new Date(2010, 9, 17);

    it("should return max month", () => {
      expect(getMaxMonth(max, date1)).toBe(8);
    });

    const date2 = new Date(2009, 7, 4);
    const date3 = new Date(2009, 8, 4);
    const date4 = new Date(2009, 9, 4);

    it("should return 11 (december), later year", () => {
      expect(getMaxMonth(max, date2)).toBe(11);
      expect(getMaxMonth(max, date3)).toBe(11);
      expect(getMaxMonth(max, date4)).toBe(11);
    });
  });

  describe("calculateRanges", () => {
    it("should correctly calculate ranges", () => {
      const min = new Date(2010, 1, 1);
      const max = new Date(2015, 11, 31);
      const value = new Date(2011, 5, 5); // June has 30 days

      expect(calculateRanges(min, max, value)).toEqual({
        dates: R.range(1, 30 + 1),
        months: R.range(0, 11 + 1),
        years: R.range(2010, 2015 + 1),
      });
    });
  });
});
