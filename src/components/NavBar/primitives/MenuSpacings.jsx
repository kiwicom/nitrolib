// @flow
import styled, { css } from "styled-components";

import mq from "../../../styles/mediaQuery";

const MenuSpacings = styled.div`
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  ${mq.ltTablet(css`
    margin-right: 5px;
  `)};
  ${mq.gtDesktop(css`
    position: relative;
  `)};
`;

export default MenuSpacings;
