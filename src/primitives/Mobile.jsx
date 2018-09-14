// @flow strict
import styled, { css } from "styled-components";

import mq from "../styles/mediaQuery";

const Mobile = styled.div`
  display: block;

  ${mq.gtTablet(css`
    display: none;
  `)};
`;

export default Mobile;
