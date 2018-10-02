// @flow
import styled from "styled-components";

import * as rtl from "../../../../../styles/rtl";
import { themeDefault } from "../../../../../records/Theme";

const Column = styled.section`
  padding-${rtl.left}: 25px;
  padding-${rtl.right}: 5px;
  display: flex;
  flex-direction: column;
`;

Column.defaultProps = {
  theme: themeDefault,
};

export default Column;
