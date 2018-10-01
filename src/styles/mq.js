// @flow strict
/* eslint-disable fp/no-rest-parameters */
import { css } from "styled-components";
import type { Interpolation } from "styled-components";
import * as R from "ramda";

import { BREAKPOINTS } from "../consts/device";

const SIZES = {
  gtDesktop: { min: BREAKPOINTS.DESKTOP },
  ltDesktop: { max: BREAKPOINTS.DESKTOP - 1 },
  tablet: { min: BREAKPOINTS.TABLET, max: BREAKPOINTS.DESKTOP - 1 },
  gtTablet: { min: BREAKPOINTS.TABLET },
  ltTablet: { max: BREAKPOINTS.TABLET - 1 },
  mobile: { max: BREAKPOINTS.TABLET - 1 },
  bigMobile: { min: BREAKPOINTS.BIG_MOBILE, max: BREAKPOINTS.TABLET - 1 },
  gtBigMobile: { min: BREAKPOINTS.BIG_MOBILE },
  ltBigMobile: { max: BREAKPOINTS.BIG_MOBILE - 1 },
  middleMobile: { min: BREAKPOINTS.MIDDLE_MOBILE, max: BREAKPOINTS.BIG_MOBILE - 1 },
  gtMiddleMobile: { min: BREAKPOINTS.MIDDLE_MOBILE },
  ltMiddleMobile: { max: BREAKPOINTS.MIDDLE_MOBILE - 1 },
  smallMobile: { min: BREAKPOINTS.SMALL_MOBILE, max: BREAKPOINTS.MIDDLE_MOBILE - 1 },
  gtSmallMobile: { min: BREAKPOINTS.SMALL_MOBILE },
  ltSmallMobile: { max: BREAKPOINTS.SMALL_MOBILE - 1 },
};

const LIMITS_MAP: $ObjMap<typeof SIZES, () => string> = R.map(
  limits =>
    [
      typeof limits.min === "number" && `(min-width: ${limits.min}px)`,
      typeof limits.max === "number" && `(max-width: ${limits.max}px)`,
    ]
      .filter(Boolean)
      .join(" and "),
  SIZES,
);

type SizeQueryFunction = (style: Interpolation[]) => Interpolation[];

const SIZED_QUERIES: $ObjMap<typeof LIMITS_MAP, () => SizeQueryFunction> = R.map(
  query => (style: Interpolation[]) => css`
    @media ${query} {
      ${style /* eslint-disable-line prettier/prettier */}
    }
  `,
  LIMITS_MAP,
);

const SPECIAL_QUERIES = {
  retinaOnly: (style: Interpolation[]) => css`
    @media only screen and (-webkit-min-device-pixel-ratio: 2),
      only screen and (min-device-pixel-ratio: 2) {
      ${style /* eslint-disable-line prettier/prettier */}
    }
  `,
  retinaMobileOnly: (style: Interpolation[]) => css`
    @media only screen and (-webkit-min-device-pixel-ratio: 2) and ${LIMITS_MAP.mobile},
      only screen and (min-device-pixel-ratio: 2) and ${LIMITS_MAP.mobile} {
      ${style /* eslint-disable-line prettier/prettier */}
    }
  `,
};

export default {
  ...SIZED_QUERIES,
  ...SPECIAL_QUERIES,
};
