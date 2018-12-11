// @flow strict
import { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import mq from "../../../styles/mq";

const marginMixin = css`
  margin-${/* sc-custom "left" */ left}: 20px;

  &:first-child {
    margin-${/* sc-custom "left" */ left}: 0;
  }

  ${mq.ltTablet(css`
    margin-${/* sc-custom "left" */ left}: 5px;

    &:first-child {
      margin-${/* sc-custom "left" */ left}: 5px;
    }
  `)};
`;

export default marginMixin;
