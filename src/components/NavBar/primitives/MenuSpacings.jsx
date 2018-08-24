// @flow
import styled, { css } from "styled-components";

import mq from "../../../styles/mediaQuery";

const MenuSpacings = styled.div`
  margin-right: 20px;
  cursor: pointer;

  ${mq.ltTablet(css`
    margin-right: 5px;
  `)};
`;

export default MenuSpacings;
