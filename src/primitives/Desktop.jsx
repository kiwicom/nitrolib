// @flow strict
import styled, { css } from "styled-components";

import mq from "../styles/mediaQuery";

const Desktop = styled.div`
  display: none;

  ${mq.gtTablet(css`
    display: block;
  `)};
`;

export default Desktop;
