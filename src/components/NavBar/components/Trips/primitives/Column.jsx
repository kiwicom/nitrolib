// @flow
import styled from "styled-components";
import { left, right } from "@kiwicom/orbit-components/lib/utils/rtl";

import { themeDefault } from "../../../../../records/Theme";

const Column = styled.section`
  padding-${left}: 25px;
  padding-${right}: 5px;
  display: flex;
  flex-direction: column;
`;

Column.defaultProps = {
  theme: themeDefault,
};

export default Column;
