// @flow strict
import { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import mq from "../../../styles/mq";

const marginMixin = css`
  margin-${left}: 20px;

  &:first-child {
    margin-${left}: 0;
  }

  ${mq.ltTablet(css`
    margin-${left}: 5px;

    &:first-child {
      margin-${left}: 5px;
    }
  `)};
`;

export default marginMixin;
