// @flow strict
import { css } from "styled-components";

import mq from "../../../styles/mq";
import * as rtl from "../../../styles/rtl";

const marginMixin = css`
  margin-${rtl.left}: 20px;

  &:first-child {
    margin-${rtl.left}: 0;
  }

  ${mq.ltTablet(css`
    margin-${rtl.left}: 5px;
  `)};
`;

export default marginMixin;
