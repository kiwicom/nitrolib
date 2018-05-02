// @flow strict
import { forEachObjIndexed } from "ramda";

import { BREAKPOINTS } from "client/consts/device";

import mq from "../mediaQuery";

const EXPECTED_QUERIES = {
  gtDesktop: `(min-width: ${BREAKPOINTS.DESKTOP}px)`,
  ltDesktop: `(max-width: ${BREAKPOINTS.DESKTOP - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.TABLET}px) and (max-width: ${BREAKPOINTS.DESKTOP - 1}px)`,
  gtTablet: `(min-width: ${BREAKPOINTS.TABLET}px)`,
  ltTablet: `(max-width: ${BREAKPOINTS.TABLET - 1}px)`,
  mobile: `(max-width: ${BREAKPOINTS.TABLET - 1}px)`,
  bigMobile: `(min-width: ${BREAKPOINTS.BIG_MOBILE}px) and (max-width: ${BREAKPOINTS.TABLET -
    1}px)`,
  gtBigMobile: `(min-width: ${BREAKPOINTS.BIG_MOBILE}px)`,
  ltBigMobile: `(max-width: ${BREAKPOINTS.BIG_MOBILE - 1}px)`,
  middleMobile: `(min-width: ${
    BREAKPOINTS.MIDDLE_MOBILE
  }px) and (max-width: ${BREAKPOINTS.BIG_MOBILE - 1}px)`,
  gtMiddleMobile: `(min-width: ${BREAKPOINTS.MIDDLE_MOBILE}px)`,
  ltMiddleMobile: `(max-width: ${BREAKPOINTS.MIDDLE_MOBILE - 1}px)`,
  smallMobile: `(min-width: ${
    BREAKPOINTS.SMALL_MOBILE
  }px) and (max-width: ${BREAKPOINTS.MIDDLE_MOBILE - 1}px)`,
  gtSmallMobile: `(min-width: ${BREAKPOINTS.SMALL_MOBILE}px)`,
  ltSmallMobile: `(max-width: ${BREAKPOINTS.SMALL_MOBILE - 1}px)`,
  retinaOnly: `only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)`,
  retinaMobileOnly: `only screen and (-webkit-min-device-pixel-ratio: 2) and (max-width: ${BREAKPOINTS.TABLET -
    1}px), only screen and (min-device-pixel-ratio: 2) and (max-width: ${BREAKPOINTS.TABLET -
    1}px)`,
};

describe("#mediaQuery", () => {
  forEachObjIndexed((query, name) => {
    test(name, () => {
      expect(mq[name]).toBeInstanceOf(Function);
    });
    test(`${name} result`, () => {
      const result = mq[name]`
        color: red;
      `;

      expect(result).toBeInstanceOf(Array);

      const resultCondensed = result.join("").replace(/\s/g, "");
      const expectatedCondensed = `@media ${query} {
        color: red;
      }`.replace(/\s/g, "");

      expect(resultCondensed).toBe(expectatedCondensed);
    });
  }, EXPECTED_QUERIES);
});
