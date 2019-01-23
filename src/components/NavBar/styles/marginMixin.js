// @flow strict
import { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

const marginMixin = css`
  margin-${/* sc-custom "left" */ left}: 5px;

  &:first-child {
    margin-${/* sc-custom "left" */ left}: 5px;
  }

  ${mq.tablet(css`
  margin-${/* sc-custom "left" */ left}: 16px;

  &:first-child {
    margin-${/* sc-custom "left" */ left}: 0;
  }
  `)};
`;

export default marginMixin;
