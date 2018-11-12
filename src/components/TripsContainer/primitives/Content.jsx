// @flow strict
import styled from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type AllProps = ThemeProps & {
  padding: boolean,
};

const Content = styled.div`
  max-height: calc(100vh - 140px);
  padding: ${({ padding }: AllProps) => (padding ? `12px` : `0`)};
  overflow-y: auto;
  overflow-x: hidden;
`;

Content.defaultProps = {
  theme: themeDefault,
};

export default Content;
