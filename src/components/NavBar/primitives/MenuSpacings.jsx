// @flow
import styled, { css } from "styled-components";

import mq from "../../../styles/mediaQuery";
import * as rtl from "../../../styles/rtl";
import { themeDefault } from "../../../records/Theme";

const MenuSpacings = styled.div`
  margin-${rtl.right}: 20px;
  cursor: pointer;
  display: flex;
  position: relative;

  ${mq.ltTablet(css`
    margin-${rtl.right}: 5px;
    position: inherit;
  `)};
`;

MenuSpacings.defaultProps = {
  theme: themeDefault,
};

export default MenuSpacings;
