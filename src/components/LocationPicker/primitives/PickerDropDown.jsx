// @flow strict
import styled from "styled-components";

import { themeDefault } from "../../../records/Theme";

const DropDown = styled.div`
  max-height: 215px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

DropDown.defaultProps = {
  theme: themeDefault,
};

export default DropDown;
